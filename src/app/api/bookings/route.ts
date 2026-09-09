import { NextResponse } from 'next/server';
import { z } from 'zod';
import { appointmentTypes, company, siteUrl } from '@/config/site';
import { createTentativeEvent, getBusyIntervals } from '@/lib/google-calendar';
import { getAppointmentType, isSlotStillAvailable } from '@/lib/slots';
import { sendCustomerReceivedMail, sendOwnerRequestMail, type BookingDetails } from '@/lib/email';
import { signDecision } from '@/lib/tokens';
import { addMinutes, formatBerlinDateTime } from '@/lib/time';
import { clientKey, rateLimit } from '@/lib/rate-limit';
import { matchZone } from '@/lib/zones';

export const dynamic = 'force-dynamic';

const bookingSchema = z.object({
  type: z.enum(appointmentTypes.map((t) => t.id) as [string, ...string[]]),
  start: z.string().datetime(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  address: z.string().trim().min(4).max(200),
  zip: z.string().trim().regex(/^\d{5}$/, 'Bitte eine fünfstellige Postleitzahl angeben.'),
  message: z.string().trim().max(2000).default(''),
  privacy: z.literal(true),
  /** Honeypot: für Menschen unsichtbar, Bots füllen es aus. */
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  if (!rateLimit(`booking:${clientKey(request)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte rufen Sie uns direkt an.' },
      { status: 429 },
    );
  }

  const parsed = bookingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Bitte prüfen Sie Ihre Eingaben.' },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const type = getAppointmentType(data.type);
  if (!type) return NextResponse.json({ error: 'Unbekannte Terminart.' }, { status: 400 });

  const start = new Date(data.start);
  const end = addMinutes(start, type.durationMinutes);
  const zone = matchZone(data.zip);

  try {
    // Erneut gegen den Kalender prüfen: zwischen Anzeige und Absenden können
    // Minuten liegen, in denen der Slot anderweitig vergeben wurde.
    const busy = await getBusyIntervals(
      addMinutes(start, -(type.bufferMinutes + 60)),
      addMinutes(end, type.bufferMinutes + 60),
    );
    if (!isSlotStillAvailable(start.toISOString(), data.type as never, busy)) {
      return NextResponse.json(
        { error: 'Dieser Termin wurde gerade vergeben. Bitte wählen Sie einen anderen.' },
        { status: 409 },
      );
    }

    const eventId = await createTentativeEvent({
      summary: `ANFRAGE: ${type.label} – ${data.name}`,
      description: [
        `Terminart: ${type.label}`,
        `Name: ${data.name}`,
        `Telefon: ${data.phone}`,
        `E-Mail: ${data.email}`,
        `Objekt: ${data.address}, ${data.zip}`,
        `Einsatzgebiet: ${zone.label} (${zone.surcharge})`,
        '',
        data.message ? `Nachricht:\n${data.message}` : 'Keine Nachricht hinterlassen.',
        '',
        'Angelegt über das Buchungsformular der Website.',
      ].join('\n'),
      location: `${data.address}, ${data.zip}`,
      start,
      end,
      customerEmail: data.email,
    });

    const details: BookingDetails = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      appointmentLabel: type.label,
      start,
      address: data.address,
      zip: data.zip,
      message: data.message,
      zoneLabel: `${zone.label} – ${zone.surcharge}`,
    };

    const expiresAt = Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60;
    const decisionUrl = (action: 'accept' | 'decline') =>
      `${siteUrl}/api/bookings/decision?token=${encodeURIComponent(
        signDecision({ eventId, action, expiresAt }),
      )}`;

    // Der Kalendereintrag ist der kritische Teil und steht bereits. Schlägt eine
    // Mail fehl, ist die Anfrage trotzdem gültig – wir loggen und antworten positiv.
    const results = await Promise.allSettled([
      sendOwnerRequestMail(details, decisionUrl('accept'), decisionUrl('decline')),
      sendCustomerReceivedMail(details),
    ]);
    for (const result of results) {
      if (result.status === 'rejected') console.error('[booking-mail]', result.reason);
    }

    return NextResponse.json({
      ok: true,
      summary: `${type.label} am ${formatBerlinDateTime(start)}`,
      hint: `Wir melden uns zur Bestätigung. Bei Rückfragen: ${company.phone}`,
    });
  } catch (error) {
    console.error('[booking]', error);
    return NextResponse.json(
      { error: 'Die Anfrage konnte nicht gespeichert werden. Bitte rufen Sie uns an.' },
      { status: 500 },
    );
  }
}
