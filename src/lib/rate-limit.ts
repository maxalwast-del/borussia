/**
 * Sehr einfaches In-Memory-Limit gegen Formular-Spam.
 *
 * Bewusst simpel gehalten: Bei einer einzelnen Serverless-Instanz reicht das
 * für einen Handwerksbetrieb völlig aus. Wächst das Anfragevolumen oder
 * laufen mehrere Instanzen, gehört hier Upstash Redis hin.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const previous = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (previous.length >= limit) {
    hits.set(key, previous);
    return false;
  }

  previous.push(now);
  hits.set(key, previous);

  // Gelegentlich aufräumen, damit die Map nicht unbegrenzt wächst.
  if (hits.size > 500) {
    for (const [existingKey, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(existingKey);
    }
  }

  return true;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}
