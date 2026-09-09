import { google, type calendar_v3 } from 'googleapis';
import { bookingRules } from '@/config/site';
import type { BusyInterval } from './slots';

/**
 * Google-Calendar-Anbindung über einen Service Account.
 *
 * Einrichtung (einmalig, siehe README):
 *  1. Google-Cloud-Projekt anlegen, Calendar API aktivieren
 *  2. Service Account erstellen, JSON-Key herunterladen
 *  3. Den betroffenen Kalender in Google Kalender für die Service-Account-
 *     E-Mail freigeben, Rechte: "Änderungen an Terminen vornehmen"
 *
 * Der Kalender selbst ist die einzige Quelle der Wahrheit – es gibt bewusst
 * keine zweite Datenbank, die auseinanderlaufen könnte.
 */

function calendarClient(): calendar_v3.Calendar {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_EMAIL oder GOOGLE_PRIVATE_KEY fehlt. Siehe .env.example.',
    );
  }
  const auth = new google.auth.JWT({
    email,
    // In .env stehen Zeilenumbrüche als "\n" – hier zurückwandeln.
    key: rawKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  return google.calendar({ version: 'v3', auth });
}

function calendarId(): string {
  const id = process.env.GOOGLE_CALENDAR_ID;
  if (!id) throw new Error('GOOGLE_CALENDAR_ID fehlt. Siehe .env.example.');
  return id;
}

/** Belegte Zeiten im Zeitraum, inklusive der noch nicht bestätigten Anfragen. */
export async function getBusyIntervals(timeMin: Date, timeMax: Date): Promise<BusyInterval[]> {
  const response = await calendarClient().freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: bookingRules.timezone,
      items: [{ id: calendarId() }],
    },
  });

  const entries = response.data.calendars?.[calendarId()]?.busy ?? [];
  return entries
    .filter((entry): entry is { start: string; end: string } =>
      Boolean(entry.start && entry.end),
    )
    .map((entry) => ({ start: new Date(entry.start), end: new Date(entry.end) }));
}

export type PendingEventInput = {
  summary: string;
  description: string;
  location?: string;
  start: Date;
  end: Date;
  customerEmail: string;
};

/**
 * Legt den Termin sofort als "tentative" an. Dadurch ist der Slot ab der
 * Sekunde der Anfrage blockiert und kann nicht doppelt vergeben werden.
 * Bestätigt wird er erst durch den Klick in der Benachrichtigungsmail.
 */
export async function createTentativeEvent(input: PendingEventInput): Promise<string> {
  const response = await calendarClient().events.insert({
    calendarId: calendarId(),
    requestBody: {
      summary: input.summary,
      description: input.description,
      location: input.location,
      status: 'tentative',
      transparency: 'opaque',
      start: { dateTime: input.start.toISOString(), timeZone: bookingRules.timezone },
      end: { dateTime: input.end.toISOString(), timeZone: bookingRules.timezone },
      extendedProperties: {
        private: { source: 'website-booking', customerEmail: input.customerEmail },
      },
    },
  });

  const id = response.data.id;
  if (!id) throw new Error('Google Kalender hat keine Event-ID zurückgegeben.');
  return id;
}

export async function getEvent(eventId: string): Promise<calendar_v3.Schema$Event | null> {
  try {
    const response = await calendarClient().events.get({ calendarId: calendarId(), eventId });
    return response.data;
  } catch (error) {
    if ((error as { code?: number }).code === 404) return null;
    throw error;
  }
}

export async function confirmEvent(eventId: string): Promise<calendar_v3.Schema$Event> {
  const existing = await getEvent(eventId);
  const response = await calendarClient().events.patch({
    calendarId: calendarId(),
    eventId,
    requestBody: {
      status: 'confirmed',
      summary: (existing?.summary ?? '').replace(/^ANFRAGE:\s*/, 'Bestätigt: '),
    },
  });
  return response.data;
}

export async function cancelEvent(eventId: string): Promise<void> {
  await calendarClient().events.delete({ calendarId: calendarId(), eventId });
}
