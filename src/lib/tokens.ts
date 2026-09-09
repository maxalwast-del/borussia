import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Signierte Freigabe-Links.
 *
 * Die Entscheidung "Termin annehmen / ablehnen" passiert per Klick aus der
 * E-Mail heraus – ohne Login. Damit niemand fremde Termine bestätigen kann,
 * ist die Nutzlast HMAC-signiert und läuft nach `expiresAt` ab.
 */

export type DecisionPayload = {
  /** Google-Calendar-Event-ID des vorgemerkten Termins. */
  eventId: string;
  action: 'accept' | 'decline';
  /** Unix-Zeit in Sekunden. */
  expiresAt: number;
};

function secret(): string {
  const value = process.env.BOOKING_TOKEN_SECRET;
  if (!value || value.length < 24) {
    throw new Error(
      'BOOKING_TOKEN_SECRET fehlt oder ist zu kurz (mindestens 24 Zeichen). Siehe .env.example.',
    );
  }
  return value;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

export function signDecision(payload: DecisionPayload): string {
  const body = base64url(JSON.stringify(payload));
  const signature = base64url(createHmac('sha256', secret()).update(body).digest());
  return `${body}.${signature}`;
}

export function verifyDecision(token: string): DecisionPayload | null {
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  const expected = createHmac('sha256', secret()).update(body).digest();
  const received = fromBase64url(signature);
  if (received.length !== expected.length) return null;
  if (!timingSafeEqual(received, expected)) return null;

  try {
    const payload = JSON.parse(fromBase64url(body).toString('utf8')) as DecisionPayload;
    if (payload.expiresAt * 1000 < Date.now()) return null;
    if (payload.action !== 'accept' && payload.action !== 'decline') return null;
    if (typeof payload.eventId !== 'string' || payload.eventId.length === 0) return null;
    return payload;
  } catch {
    return null;
  }
}
