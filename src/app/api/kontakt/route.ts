import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendPlainMail } from '@/lib/email';
import { clientKey, rateLimit } from '@/lib/rate-limit';
import { matchZone } from '@/lib/zones';

export const dynamic = 'force-dynamic';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).default(''),
  zip: z.string().trim().max(10).default(''),
  subject: z.string().trim().max(120).default('Allgemeine Anfrage'),
  message: z.string().trim().min(10).max(4000),
  privacy: z.literal(true),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  if (!rateLimit(`kontakt:${clientKey(request)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Zu viele Anfragen. Bitte rufen Sie uns an.' }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Bitte prüfen Sie Ihre Eingaben.' }, { status: 400 });
  }
  const data = parsed.data;

  try {
    await sendPlainMail(
      `Kontaktanfrage: ${data.subject}`,
      {
        Name: data.name,
        'E-Mail': data.email,
        Telefon: data.phone || '–',
        PLZ: data.zip ? `${data.zip} (${matchZone(data.zip).label})` : '–',
        Nachricht: data.message,
      },
      data.email,
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[kontakt]', error);
    return NextResponse.json({ error: 'Versand fehlgeschlagen. Bitte rufen Sie uns an.' }, { status: 500 });
  }
}
