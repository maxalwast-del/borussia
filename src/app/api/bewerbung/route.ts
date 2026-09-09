import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendPlainMail } from '@/lib/email';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  position: z.string().trim().min(2).max(120),
  experience: z.string().trim().max(60).default(''),
  message: z.string().trim().max(3000).default(''),
  privacy: z.literal(true),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  if (!rateLimit(`bewerbung:${clientKey(request)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Bitte prüfen Sie Ihre Eingaben.' }, { status: 400 });
  }
  const data = parsed.data;

  try {
    await sendPlainMail(
      `Bewerbung: ${data.position} – ${data.name}`,
      {
        Position: data.position,
        Name: data.name,
        'E-Mail': data.email,
        Telefon: data.phone,
        Berufserfahrung: data.experience || 'keine Angabe',
        Nachricht: data.message || '–',
      },
      data.email,
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[bewerbung]', error);
    return NextResponse.json({ error: 'Versand fehlgeschlagen.' }, { status: 500 });
  }
}
