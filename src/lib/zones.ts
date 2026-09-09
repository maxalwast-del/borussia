import { serviceZones, type ServiceZoneId } from '@/config/site';

export type ZoneMatch = {
  id: ServiceZoneId;
  label: string;
  note: string;
  surcharge: string;
  inside: boolean;
};

/**
 * Ordnet eine Postleitzahl einer Einsatzzone zu – längste Präfix-Übereinstimmung gewinnt,
 * damit z. B. "14467" (Potsdam) im Umland landet und nicht in der Brandenburg-Sammelzone.
 */
export function matchZone(zip: string): ZoneMatch {
  const clean = zip.replace(/\D/g, '');
  let best: { zone: (typeof serviceZones)[number]; length: number } | null = null;

  for (const zone of serviceZones) {
    for (const prefix of zone.prefixes) {
      if (clean.startsWith(prefix) && (!best || prefix.length > best.length)) {
        best = { zone, length: prefix.length };
      }
    }
  }

  if (!best) {
    return {
      id: 'outside',
      label: 'Außerhalb des regulären Einsatzgebiets',
      note: 'Wir prüfen die Anfrage trotzdem – ab einer gewissen Projektgröße fahren wir weiter.',
      surcharge: 'auf Anfrage',
      inside: false,
    };
  }

  return {
    id: best.zone.id,
    label: best.zone.label,
    note: best.zone.note,
    surcharge: best.zone.surcharge,
    inside: true,
  };
}
