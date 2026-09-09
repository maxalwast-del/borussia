import { company } from '@/config/site';
import { cancelEvent, confirmEvent, getEvent } from '@/lib/google-calendar';
import { sendCustomerConfirmedMail, sendCustomerDeclinedMail, type BookingDetails } from '@/lib/email';
import { verifyDecision } from '@/lib/tokens';
import { formatBerlinDateTime } from '@/lib/time';

export const dynamic = 'force-dynamic';

/**
 * Freigabe der Terminanfrage aus der E-Mail heraus.
 *
 * Warum zwei Schritte statt eines reinen Links: Viele Mailclients und
 * Sicherheitsscanner rufen enthaltene Links automatisch ab. Ein GET, das direkt
 * bestätigt, würde dadurch Termine ohne Zutun zusagen. Deshalb zeigt GET nur
 * eine Seite mit einem Button, und erst dessen POST verändert etwas.
 */

function page(title: string, body: string, accent = '#17212B'): Response {
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${title} · ${company.name}</title>
  <style>
    body{margin:0;background:#F3F6F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#17212B;
      display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;}
    .card{background:#fff;border:1px solid #E4EAF0;border-radius:14px;padding:40px;max-width:520px;width:100%;
      box-shadow:0 18px 44px -16px rgba(23,33,43,.22);}
    h1{margin:0 0 14px;font-size:22px;color:${accent};}
    p{margin:0 0 14px;font-size:15px;line-height:1.65;color:#2C3A47;}
    .meta{background:#F3F6F9;border-radius:10px;padding:16px;font-size:14px;line-height:1.7;margin:20px 0;}
    button{font:inherit;font-weight:600;padding:13px 22px;border-radius:9px;border:0;cursor:pointer;}
    .accept{background:#1B7A5A;color:#fff;}
    .decline{background:#A33B3B;color:#fff;}
    .foot{font-size:12px;color:#5C6B7A;margin-top:22px;}
  </style></head><body><div class="card">${body}
  <p class="foot">${company.legalName} · ${company.phone}</p></div></body></html>`;
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

function eventDetails(event: Awaited<ReturnType<typeof getEvent>>): BookingDetails | null {
  if (!event?.start?.dateTime) return null;
  const description = event.description ?? '';
  const field = (label: string) =>
    new RegExp(`^${label}:\\s*(.*)$`, 'm').exec(description)?.[1]?.trim() ?? '';

  const email = event.extendedProperties?.private?.customerEmail ?? field('E-Mail');
  if (!email) return null;

  return {
    name: field('Name'),
    email,
    phone: field('Telefon'),
    appointmentLabel: field('Terminart') || 'Termin',
    start: new Date(event.start.dateTime),
    address: event.location ?? field('Objekt'),
    zip: '',
    message: '',
    zoneLabel: field('Einsatzgebiet'),
  };
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const payload = verifyDecision(token);
  if (!payload) {
    return page('Link ungültig', '<h1>Link ungültig oder abgelaufen</h1><p>Bitte bearbeiten Sie den Termin direkt im Google Kalender.</p>', '#A33B3B');
  }

  const event = await getEvent(payload.eventId);
  if (!event) {
    return page('Termin nicht gefunden', '<h1>Dieser Termin existiert nicht mehr</h1><p>Er wurde vermutlich bereits abgesagt oder im Kalender gelöscht.</p>', '#A33B3B');
  }
  if (event.status === 'confirmed' && payload.action === 'accept') {
    return page('Bereits bestätigt', '<h1>Dieser Termin ist bereits bestätigt</h1><p>Der Kunde hat die Bestätigungsmail erhalten.</p>', '#1B7A5A');
  }

  const details = eventDetails(event);
  const meta = details
    ? `<div class="meta"><strong>${details.appointmentLabel}</strong><br>${formatBerlinDateTime(details.start)}<br><br>
       ${details.name}<br>${details.phone}<br>${details.address}</div>`
    : '';

  const accept = payload.action === 'accept';
  return page(
    accept ? 'Termin bestätigen' : 'Termin absagen',
    `<h1>${accept ? 'Termin bestätigen?' : 'Termin absagen?'}</h1>
     <p>${accept
       ? 'Der Termin wird im Kalender auf „bestätigt“ gesetzt und der Kunde erhält automatisch die Bestätigungsmail.'
       : 'Der Termin wird aus dem Kalender entfernt und der Kunde erhält eine Absage mit Link auf neue Termine.'}</p>
     ${meta}
     <form method="post"><input type="hidden" name="token" value="${token.replace(/"/g, '&quot;')}">
     <button class="${accept ? 'accept' : 'decline'}" type="submit">${accept ? 'Ja, bestätigen' : 'Ja, absagen'}</button></form>`,
    accept ? '#1B7A5A' : '#A33B3B',
  );
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const token = String(form?.get('token') ?? '');
  const payload = verifyDecision(token);
  if (!payload) {
    return page('Link ungültig', '<h1>Link ungültig oder abgelaufen</h1>', '#A33B3B');
  }

  const event = await getEvent(payload.eventId);
  if (!event) {
    return page('Termin nicht gefunden', '<h1>Dieser Termin existiert nicht mehr</h1>', '#A33B3B');
  }
  const details = eventDetails(event);

  try {
    if (payload.action === 'accept') {
      await confirmEvent(payload.eventId);
      if (details) await sendCustomerConfirmedMail(details);
      return page(
        'Termin bestätigt',
        `<h1>Termin bestätigt</h1><p>Der Eintrag steht im Kalender${
          details ? ` und ${details.name} hat die Bestätigung per E-Mail erhalten` : ''
        }.</p>`,
        '#1B7A5A',
      );
    }

    if (details) await sendCustomerDeclinedMail(details);
    await cancelEvent(payload.eventId);
    return page(
      'Termin abgesagt',
      `<h1>Termin abgesagt</h1><p>Der Slot ist wieder frei${
        details ? ` und ${details.name} wurde informiert` : ''
      }.</p>`,
      '#A33B3B',
    );
  } catch (error) {
    console.error('[decision]', error);
    return page(
      'Fehler',
      `<h1>Das hat nicht geklappt</h1><p>Bitte prüfen Sie den Termin direkt im Google Kalender und melden Sie sich beim Kunden.</p>`,
      '#A33B3B',
    );
  }
}
