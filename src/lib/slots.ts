import { appointmentTypes, bookingRules, bookingWindows, type AppointmentTypeId } from '@/config/site';
import {
  addMinutes,
  berlinDateParts,
  berlinWallClockToUtc,
  parseHhMm,
  parseIsoDate,
} from './time';

export type BusyInterval = { start: Date; end: Date };

export type Slot = {
  /** Startzeit als ISO-String in UTC. */
  start: string;
  /** Endzeit des reinen Termins (ohne Puffer). */
  end: string;
  /** Anzeigetext, z. B. "09:30". */
  label: string;
};

export function getAppointmentType(id: string) {
  return appointmentTypes.find((type) => type.id === id);
}

function overlaps(a: BusyInterval, b: BusyInterval): boolean {
  return a.start < b.end && b.start < a.end;
}

/**
 * Erzeugt alle theoretisch buchbaren Slots eines Tages und entfernt jene,
 * die sich mit belegten Zeiten aus dem Google Kalender überschneiden.
 *
 * Der Puffer (Fahrzeit) wird beidseitig auf den Termin aufgeschlagen, bevor
 * gegen die Belegung geprüft wird – so entstehen keine Termine ohne Anfahrtszeit.
 */
export function buildSlotsForDay(
  dateIso: string,
  typeId: AppointmentTypeId,
  busy: BusyInterval[],
  now: Date = new Date(),
): Slot[] {
  const type = getAppointmentType(typeId);
  const date = parseIsoDate(dateIso);
  if (!type || !date) return [];

  const weekday = berlinDateParts(
    berlinWallClockToUtc(date.year, date.month, date.day, 12, 0),
  ).weekday;
  const windows = bookingWindows[weekday] ?? [];
  if (windows.length === 0) return [];

  const earliest = new Date(now.getTime() + bookingRules.minLeadTimeHours * 3_600_000);
  const slots: Slot[] = [];

  for (const window of windows) {
    const from = parseHhMm(window.start);
    const to = parseHhMm(window.end);
    const windowStart = berlinWallClockToUtc(date.year, date.month, date.day, from.hour, from.minute);
    const windowEnd = berlinWallClockToUtc(date.year, date.month, date.day, to.hour, to.minute);

    for (
      let cursor = windowStart;
      addMinutes(cursor, type.durationMinutes) <= windowEnd;
      cursor = addMinutes(cursor, bookingRules.slotGranularityMinutes)
    ) {
      if (cursor < earliest) continue;

      const slotEnd = addMinutes(cursor, type.durationMinutes);
      const guarded: BusyInterval = {
        start: addMinutes(cursor, -type.bufferMinutes),
        end: addMinutes(slotEnd, type.bufferMinutes),
      };
      if (busy.some((interval) => overlaps(guarded, interval))) continue;

      slots.push({
        start: cursor.toISOString(),
        end: slotEnd.toISOString(),
        label: new Intl.DateTimeFormat('de-DE', {
          timeZone: bookingRules.timezone,
          hour: '2-digit',
          minute: '2-digit',
        }).format(cursor),
      });
    }
  }

  return slots;
}

/**
 * Prüft serverseitig erneut, ob ein konkret gewünschter Start noch frei ist.
 * Schützt gegen Race Conditions zwischen Anzeige und Absenden des Formulars.
 */
export function isSlotStillAvailable(
  startIso: string,
  typeId: AppointmentTypeId,
  busy: BusyInterval[],
  now: Date = new Date(),
): boolean {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return false;
  const dateIso = berlinDateParts(start).iso;
  return buildSlotsForDay(dateIso, typeId, busy, now).some((slot) => slot.start === start.toISOString());
}
