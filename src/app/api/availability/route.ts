import { NextResponse } from 'next/server';
import { z } from 'zod';
import { appointmentTypes, bookingRules } from '@/config/site';
import { getBusyIntervals } from '@/lib/google-calendar';
import { buildSlotsForDay } from '@/lib/slots';
import { addDays, berlinDateParts, berlinWallClockToUtc, parseIsoDate } from '@/lib/time';

export const dynamic = 'force-dynamic';

const querySchema = z.object({
  type: z.enum(appointmentTypes.map((t) => t.id) as [string, ...string[]]),
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  days: z.coerce.number().int().min(1).max(21).default(14),
});

/**
 * Liefert die freien Slots für einen Zeitraum.
 * Ein einziger Freebusy-Aufruf deckt alle Tage ab – das hält die Antwort schnell
 * und bleibt weit unter den Google-API-Quoten.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    type: url.searchParams.get('type'),
    from: url.searchParams.get('from'),
    days: url.searchParams.get('days') ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const fromParts = parseIsoDate(parsed.data.from);
  if (!fromParts) return NextResponse.json({ error: 'Ungültiges Datum.' }, { status: 400 });

  const now = new Date();
  const horizonEnd = addDays(now, bookingRules.bookingHorizonDays);
  const rangeStart = berlinWallClockToUtc(fromParts.year, fromParts.month, fromParts.day, 0, 0);
  const rangeEnd = addDays(rangeStart, parsed.data.days);

  if (rangeStart > horizonEnd) {
    return NextResponse.json({ days: [] });
  }

  try {
    const busy = await getBusyIntervals(new Date(Math.min(rangeStart.getTime(), now.getTime())), rangeEnd);

    const days = Array.from({ length: parsed.data.days }, (_, offset) => {
      const date = addDays(rangeStart, offset);
      const iso = berlinDateParts(date).iso;
      const slots = date > horizonEnd ? [] : buildSlotsForDay(iso, parsed.data.type as never, busy, now);
      return { date: iso, slots };
    });

    return NextResponse.json({ days });
  } catch (error) {
    console.error('[availability]', error);
    return NextResponse.json(
      { error: 'Der Kalender ist gerade nicht erreichbar. Bitte rufen Sie uns an.' },
      { status: 503 },
    );
  }
}
