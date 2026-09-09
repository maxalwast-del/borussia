/**
 * ZENTRALE KONFIGURATION
 * =======================
 * Alle mit [PLATZHALTER] markierten Werte vor dem Livegang austauschen.
 * Sonst muss nichts im Code angefasst werden.
 */

export const company = {
  name: 'Borussia Baudienstleistungen',
  legalName: 'Borussia Baudienstleistungen GmbH', // [PLATZHALTER] Rechtsform prüfen
  slogan: 'Renovieren. Sanieren. Modernisieren.',
  tagline: 'Trockenbau und Innenausbau für Altbau und Sanierung in Berlin und Brandenburg',
  foundedYear: 2009, // [PLATZHALTER]
  teamSize: 12, // [PLATZHALTER]

  street: 'Musterstraße 12', // [PLATZHALTER]
  zip: '12437', // [PLATZHALTER]
  city: 'Berlin', // [PLATZHALTER]
  country: 'DE',

  phone: '+49 30 1234567', // [PLATZHALTER]
  phoneHref: '+493012345670', // [PLATZHALTER]: nur Ziffern, für tel:-Links
  whatsapp: '4915112345678', // [PLATZHALTER]: Ländervorwahl ohne +, für wa.me
  email: 'info@borussia-bau.de', // [PLATZHALTER]
  jobsEmail: 'jobs@borussia-bau.de', // [PLATZHALTER]

  // Handelsregister / Steuer – [PLATZHALTER]
  register: 'HRB 123456 B, Amtsgericht Berlin-Charlottenburg',
  vatId: 'DE123456789',
  managingDirector: 'Max Mustermann',
  chamber: 'Handwerkskammer Berlin',

  openingHours: [
    { days: 'Mo – Do', time: '07:00 – 16:30 Uhr' },
    { days: 'Fr', time: '07:00 – 14:00 Uhr' },
    { days: 'Sa – So', time: 'geschlossen' },
  ],

  socials: {
    instagram: 'https://instagram.com/', // [PLATZHALTER]: leerer String blendet den Link aus
    facebook: '',
  },
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.borussia-bau.de';

/**
 * Einsatzgebiet. Der PLZ-Check im Buchungsformular liest diese Zonen aus.
 * `prefixes` sind PLZ-Anfänge; Die Zone ergibt sich aus der längsten Übereinstimmung.
 */
export const serviceZones = [
  {
    id: 'kern',
    label: 'Berlin (gesamtes Stadtgebiet)',
    prefixes: ['10', '12', '13', '14', '16', '10', '12'],
    note: 'Anfahrt inklusive. Aufmaßtermine meist innerhalb von fünf Werktagen.',
    surcharge: 'ohne Anfahrtspauschale',
  },
  {
    id: 'umland',
    label: 'Berliner Umland / Potsdam',
    prefixes: ['144', '145', '146', '147', '148', '150', '153', '154', '155', '163', '164', '165'],
    note: 'Regulär im Einsatzgebiet. Anfahrtspauschale je nach Entfernung.',
    surcharge: 'Anfahrtspauschale ab 45 €',
  },
  {
    id: 'brandenburg',
    label: 'Brandenburg (weiteres Umland)',
    prefixes: ['03', '14', '15', '16', '17', '19'],
    note: 'Auf Anfrage. Wir prüfen vor der Zusage, ob wir das zeitlich schaffen.',
    surcharge: 'nach Absprache',
  },
] as const;

export type ServiceZoneId = (typeof serviceZones)[number]['id'] | 'outside';

/**
 * Terminarten. `durationMinutes` steuert die Slot-Länge im Buchungskalender,
 * `bufferMinutes` den Puffer davor/danach (Fahrzeit).
 */
export const appointmentTypes = [
  {
    id: 'aufmass',
    label: 'Aufmaß & Beratung vor Ort',
    description:
      'Wir kommen zu Ihnen, messen auf und besprechen die Ausführung. Danach bekommen Sie ein Festpreisangebot.',
    durationMinutes: 60,
    bufferMinutes: 45,
    price: 'kostenfrei im Einsatzgebiet',
  },
  {
    id: 'telefon',
    label: 'Telefonische Erstberatung',
    description:
      'Kurzes Gespräch über Machbarkeit, Preisrahmen und Terminlage. Sinnvoll, solange Sie noch planen.',
    durationMinutes: 20,
    bufferMinutes: 10,
    price: 'kostenfrei',
  },
  {
    id: 'abnahme',
    label: 'Nachbesprechung / Abnahme',
    description: 'Für laufende Projekte: Zwischenabnahme, offene Restpunkte, Übergabe.',
    durationMinutes: 45,
    bufferMinutes: 30,
    price: 'kostenfrei für Bestandskunden',
  },
] as const;

export type AppointmentTypeId = (typeof appointmentTypes)[number]['id'];

/**
 * Buchbare Zeiten (lokale Zeit, Europe/Berlin). 0 = Sonntag bis 6 = Samstag.
 */
export const bookingWindows: Record<number, { start: string; end: string }[]> = {
  1: [{ start: '07:30', end: '16:00' }],
  2: [{ start: '07:30', end: '16:00' }],
  3: [{ start: '07:30', end: '16:00' }],
  4: [{ start: '07:30', end: '16:00' }],
  5: [{ start: '07:30', end: '13:00' }],
};

export const bookingRules = {
  timezone: 'Europe/Berlin',
  /** Frühestens buchbar in X Stunden ab jetzt. */
  minLeadTimeHours: 24,
  /** Wie weit im Voraus der Kalender geöffnet wird. */
  bookingHorizonDays: 45,
  /** Raster der angebotenen Startzeiten in Minuten. */
  slotGranularityMinutes: 30,
  /** Anfragen laufen ab, wenn sie nicht bestätigt werden (nur Info-Text). */
  responseTimePromise: 'Rückmeldung meist innerhalb eines Werktages',
} as const;
