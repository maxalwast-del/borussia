import { Resend } from 'resend';
import { company, siteUrl } from '@/config/site';
import { formatBerlinDateTime } from './time';

/**
 * E-Mail-Versand über Resend (https://resend.com).
 * Die Absenderdomain muss dort einmalig per DNS verifiziert werden,
 * sonst landen die Mails im Spam.
 */

function client(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY fehlt. Siehe .env.example.');
  return new Resend(key);
}

function fromAddress(): string {
  return process.env.MAIL_FROM ?? `${company.name} <noreply@example.com>`;
}

function ownerAddress(): string {
  return process.env.MAIL_TO_OWNER ?? company.email;
}

const styles = {
  wrapper:
    'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#F3F6F9;padding:32px 16px;',
  card: 'max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;padding:32px;border:1px solid #E4EAF0;',
  h1: 'margin:0 0 16px;font-size:20px;line-height:1.3;color:#17212B;',
  p: 'margin:0 0 14px;font-size:15px;line-height:1.65;color:#2C3A47;',
  meta: 'margin:20px 0;padding:16px;background:#F3F6F9;border-radius:10px;font-size:14px;line-height:1.7;color:#2C3A47;',
  footer: 'margin:24px 0 0;font-size:12px;line-height:1.6;color:#5C6B7A;',
  buttonAccept:
    'display:inline-block;padding:13px 22px;background:#1B7A5A;color:#ffffff;text-decoration:none;border-radius:9px;font-size:15px;font-weight:600;',
  buttonDecline:
    'display:inline-block;padding:13px 22px;background:#ffffff;color:#A33B3B;border:1px solid #E3C4C4;text-decoration:none;border-radius:9px;font-size:15px;font-weight:600;',
};

function shell(inner: string): string {
  return `<div style="${styles.wrapper}"><div style="${styles.card}">${inner}
    <p style="${styles.footer}">${company.legalName} · ${company.street} · ${company.zip} ${company.city}<br>
    Telefon ${company.phone} · ${company.email}</p>
  </div></div>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export type BookingDetails = {
  name: string;
  email: string;
  phone: string;
  appointmentLabel: string;
  start: Date;
  address: string;
  zip: string;
  message: string;
  zoneLabel: string;
};

function detailBlock(booking: BookingDetails): string {
  return `<div style="${styles.meta}">
    <strong>${escapeHtml(booking.appointmentLabel)}</strong><br>
    ${escapeHtml(formatBerlinDateTime(booking.start))}<br><br>
    <strong>Kunde:</strong> ${escapeHtml(booking.name)}<br>
    <strong>Telefon:</strong> ${escapeHtml(booking.phone)}<br>
    <strong>E-Mail:</strong> ${escapeHtml(booking.email)}<br>
    <strong>Objekt:</strong> ${escapeHtml(booking.address)}, ${escapeHtml(booking.zip)}<br>
    <strong>Gebiet:</strong> ${escapeHtml(booking.zoneLabel)}
    ${booking.message ? `<br><br><strong>Nachricht:</strong><br>${escapeHtml(booking.message).replace(/\n/g, '<br>')}` : ''}
  </div>`;
}

/** Anfrage-Mail an den Betrieb – mit den beiden Entscheidungs-Buttons. */
export async function sendOwnerRequestMail(
  booking: BookingDetails,
  acceptUrl: string,
  declineUrl: string,
) {
  const html = shell(`
    <h1 style="${styles.h1}">Neue Terminanfrage über die Website</h1>
    <p style="${styles.p}">Der Slot ist im Kalender bereits vorgemerkt und für andere Anfragen gesperrt.
    Mit einem Klick bestätigen oder absagen – der Kunde bekommt automatisch Bescheid.</p>
    ${detailBlock(booking)}
    <p style="margin:24px 0 0;">
      <a href="${acceptUrl}" style="${styles.buttonAccept}">Termin bestätigen</a>
      &nbsp;&nbsp;
      <a href="${declineUrl}" style="${styles.buttonDecline}">Absagen</a>
    </p>
    <p style="${styles.footer}">Die Links sind 14 Tage gültig.</p>
  `);

  return client().emails.send({
    from: fromAddress(),
    to: ownerAddress(),
    replyTo: booking.email,
    subject: `Terminanfrage: ${booking.appointmentLabel} – ${formatBerlinDateTime(booking.start)}`,
    html,
  });
}

/** Eingangsbestätigung an den Kunden (Termin ist noch nicht fix). */
export async function sendCustomerReceivedMail(booking: BookingDetails) {
  const html = shell(`
    <h1 style="${styles.h1}">Ihre Terminanfrage ist eingegangen</h1>
    <p style="${styles.p}">Guten Tag ${escapeHtml(booking.name)},<br>
    vielen Dank für Ihre Anfrage. Wir haben den Wunschtermin vorgemerkt und prüfen ihn.
    ${escapeHtml(company.name)} meldet sich mit einer verbindlichen Bestätigung – in der Regel
    innerhalb eines Werktages.</p>
    ${detailBlock(booking)}
    <p style="${styles.p}">Sie möchten etwas ergänzen? Antworten Sie einfach auf diese E-Mail
    oder rufen Sie an: ${escapeHtml(company.phone)}.</p>
  `);

  return client().emails.send({
    from: fromAddress(),
    to: booking.email,
    replyTo: ownerAddress(),
    subject: `Anfrage eingegangen: ${booking.appointmentLabel} am ${formatBerlinDateTime(booking.start)}`,
    html,
  });
}

/** Automatische Bestätigungsmail, sobald der Betrieb zugesagt hat. */
export async function sendCustomerConfirmedMail(booking: BookingDetails) {
  const html = shell(`
    <h1 style="${styles.h1}">Ihr Termin ist bestätigt</h1>
    <p style="${styles.p}">Guten Tag ${escapeHtml(booking.name)},<br>
    der Termin steht fest. Wir freuen uns auf Sie.</p>
    ${detailBlock(booking)}
    <p style="${styles.p}"><strong>Damit es zügig geht:</strong> Halten Sie – falls vorhanden –
    Grundrisse oder Fotos bereit, und sorgen Sie dafür, dass die betroffenen Räume zugänglich sind.</p>
    <p style="${styles.p}">Sollte etwas dazwischenkommen, sagen Sie uns bitte bis spätestens 24 Stunden
    vorher Bescheid: ${escapeHtml(company.phone)}.</p>
    <p style="${styles.footer}">Alle Leistungen im Überblick: ${siteUrl}/leistungen</p>
  `);

  return client().emails.send({
    from: fromAddress(),
    to: booking.email,
    replyTo: ownerAddress(),
    subject: `Terminbestätigung: ${booking.appointmentLabel} am ${formatBerlinDateTime(booking.start)}`,
    html,
  });
}

/** Absage mit Hinweis auf Alternativtermine. */
export async function sendCustomerDeclinedMail(booking: BookingDetails) {
  const html = shell(`
    <h1 style="${styles.h1}">Ihr Wunschtermin ist leider nicht möglich</h1>
    <p style="${styles.p}">Guten Tag ${escapeHtml(booking.name)},<br>
    der angefragte Termin lässt sich bei uns nicht einrichten. Das liegt meist an der
    Auslastung oder der Anfahrt an diesem Tag – nicht an Ihrem Projekt.</p>
    ${detailBlock(booking)}
    <p style="${styles.p}">Suchen Sie sich gern direkt einen neuen Termin aus:
    <a href="${siteUrl}/termin" style="color:#1F6FB2;">${siteUrl}/termin</a><br>
    Oder rufen Sie an, dann finden wir kurzfristig etwas: ${escapeHtml(company.phone)}.</p>
  `);

  return client().emails.send({
    from: fromAddress(),
    to: booking.email,
    replyTo: ownerAddress(),
    subject: 'Ihre Terminanfrage – leider nicht möglich',
    html,
  });
}

/** Kontakt- und Bewerbungsformular. */
export async function sendPlainMail(subject: string, lines: Record<string, string>, replyTo?: string) {
  const body = Object.entries(lines)
    .map(([key, value]) => `<strong>${escapeHtml(key)}:</strong><br>${escapeHtml(value).replace(/\n/g, '<br>')}`)
    .join('<br><br>');

  return client().emails.send({
    from: fromAddress(),
    to: ownerAddress(),
    replyTo,
    subject,
    html: shell(`<h1 style="${styles.h1}">${escapeHtml(subject)}</h1><div style="${styles.meta}">${body}</div>`),
  });
}
