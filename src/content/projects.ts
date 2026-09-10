/**
 * Portfolio / Referenzen.
 * [PLATZHALTER] Alle Einträge durch echte Projekte ersetzen. Struktur beibehalten,
 * dann funktionieren Übersicht, Detailseite, Filter und Sitemap automatisch.
 */

export type Project = {
  slug: string;
  title: string;
  location: string;
  year: number;
  category:
    | 'Trockenbau'
    | 'Fliesenarbeiten'
    | 'Malerarbeiten'
    | 'Innenausbau'
    | 'Sanierung'
    | 'Bodenlegerarbeiten';
  summary: string;
  duration: string;
  area: string;
  scope: string[];
  challenge: string;
  solution: string;
  result: string;
  testimonial?: { quote: string; author: string };
};

export const projects: Project[] = [
  {
    slug: 'altbau-prenzlauer-berg',
    title: 'Altbauwohnung mit neuem Grundriss',
    location: 'Berlin Prenzlauer Berg',
    year: 2025,
    category: 'Trockenbau',
    summary:
      'Aus vier verwinkelten Zimmern wurde ein offener Wohnbereich mit abgetrenntem Arbeitszimmer. Der Stuck ist geblieben.',
    duration: '3 Wochen',
    area: '112 m²',
    scope: ['Trennwände in Metallständerbauweise', 'Schiebetürsystem', 'Stuckerhalt an Anschlüssen', 'Q3-Spachtelung'],
    challenge:
      'Der originale Deckenstuck sollte bleiben, gleichzeitig mussten zwei tragende Anschlüsse neu gefasst werden. Dazu kam eine Altbaudecke mit bis zu vier Zentimetern Höhenunterschied.',
    solution:
      'Die Wandanschlüsse haben wir mit Trennschnitt und Gleitanschluss ausgeführt, damit der Stuck rissfrei stehen bleibt. Die Unebenheit der Decke fängt eine justierbare Unterkonstruktion ab.',
    result:
      'Offener Wohnbereich mit sauberer Kante zum Bestand. Nach zwölf Monaten waren an den Anschlüssen keine Setzrisse zu sehen.',
    testimonial: {
      quote:
        'Zeitplan gehalten, Baustelle jeden Abend besenrein. An zwei Stellen haben sie von sich aus nachgebessert, ohne dass wir fragen mussten.',
      author: 'Eigentümerin, Prenzlauer Berg',
    },
  },
  {
    slug: 'dachausbau-koepenick',
    title: 'Dachgeschossausbau mit Gaube',
    location: 'Berlin Köpenick',
    year: 2025,
    category: 'Innenausbau',
    summary: 'Ungenutzter Spitzboden wurde zu zwei Kinderzimmern mit Dachschrägen und Kniestock.',
    duration: '4 Wochen',
    area: '68 m²',
    scope: ['Zwischensparrendämmung', 'Dampfbremse mit Blower-Door-Vorbereitung', 'Dachschrägenbekleidung', 'Kniestockschränke'],
    challenge:
      'Die Dampfbremse musste luftdicht an 14 Sparren, zwei Gauben und den Kaminzug anschließen. Jede undichte Stelle wäre später ein Bauschaden geworden.',
    solution:
      'Alle Durchdringungen haben wir mit Manschetten und Anschlussklebeband systemkonform ausgeführt und vor dem Beplanken einzeln fotografiert.',
    result: 'Der Blower-Door-Test ging durch. Die Fotos der Anschlüsse hat der Bauherr bekommen.',
  },
  {
    slug: 'akustikdecke-praxis-mitte',
    title: 'Akustikdecke für eine Praxis',
    location: 'Berlin Mitte',
    year: 2024,
    category: 'Trockenbau',
    summary: 'Abgehängte Lochplattendecke für Sprachverständlichkeit und Diskretion zwischen Behandlungsräumen.',
    duration: '2 Wochen',
    area: '190 m²',
    scope: ['Abgehängte Decke', 'Akustik-Lochplatten', 'Integrierte Beleuchtung', 'Revisionsöffnungen'],
    challenge:
      'Der Umbau lief im laufenden Praxisbetrieb. Gearbeitet werden durfte nur zwischen 16 und 22 Uhr, und das möglichst staubarm.',
    solution:
      'Wir haben in Abschnitten gearbeitet, mit Staubschutzwänden und Absaugung an jedem Schnitt. Am nächsten Morgen war der Bereich wieder nutzbar.',
    result: 'Die Praxis hatte keinen einzigen Ausfalltag. Im Wartebereich ist der Nachhall deutlich zurückgegangen.',
    testimonial: {
      quote: 'Wir konnten durchgehend behandeln. Morgens war nichts mehr von der Baustelle zu sehen.',
      author: 'Praxisinhaber, Berlin-Mitte',
    },
  },
  {
    slug: 'wohnungsumbau-potsdam',
    title: 'Wohnungszusammenlegung als Komplettsanierung',
    location: 'Potsdam',
    year: 2024,
    category: 'Sanierung',
    summary: 'Zwei kleine Wohnungen wurden zu einer Familienwohnung, mit neuem Schallschutz zur Nachbarwohnung.',
    duration: '5 Wochen',
    area: '140 m²',
    scope: ['Vorsatzschalen mit Schallschutz', 'Neue Trennwände', 'Bad neu gefliest', 'Maler- und Bodenarbeiten', 'Koordination Elektro und Sanitär'],
    challenge: 'Die Wohnungstrennwand zum Nachbarn lag deutlich unter heutigem Schallschutzniveau.',
    solution:
      'Eine freistehende Vorsatzschale mit Mineralwolle, entkoppelt und ohne starre Verbindung zum Bestandsmauerwerk.',
    result: 'Der Schallschutz ist messbar besser, die Schlafräume merklich ruhiger. Die Familie hatte über fünf Wochen einen Ansprechpartner statt fünf.',
  },
  {
    slug: 'bad-feuchtraum-charlottenburg',
    title: 'Feuchtraumausbau Bad',
    location: 'Berlin Charlottenburg',
    year: 2024,
    category: 'Fliesenarbeiten',
    summary: 'Installationsvorwand und Feuchtraumbeplankung als Untergrund für großformatige Fliesen.',
    duration: '8 Tage',
    area: '14 m²',
    scope: ['Installationsvorwand', 'Imprägnierte Bauplatten', 'Verbundabdichtung', 'Nischen und Ablagen'],
    challenge: 'Großformatfliesen verzeihen keine Toleranzen. Der Untergrund musste entsprechend eben werden.',
    solution: 'Engere Ständerabstände, doppelte Beplankung und eine Ebenheitskontrolle, bevor die erste Fliese lag.',
    result: 'Weil Untergrund und Belag aus demselben Betrieb kamen, gab es keine Schnittstelle, an der sich zwei Gewerke die Schuld zuschieben.',
  },
  {
    slug: 'buero-loft-friedrichshain',
    title: 'Büroloft mit Besprechungsboxen',
    location: 'Berlin Friedrichshain',
    year: 2023,
    category: 'Innenausbau',
    summary: 'Drei freistehende Besprechungsboxen in einer offenen Hallenfläche, akustisch entkoppelt.',
    duration: '3 Wochen',
    area: '85 m²',
    scope: ['Freistehende Raum-in-Raum-Konstruktion', 'Doppelbeplankung', 'Glaselemente', 'Deckenanschluss entkoppelt'],
    challenge: 'Die Boxen sollten rückbaubar sein und die Sichtbetondecke nicht beschädigen.',
    solution: 'Die Konstruktion steht auf eigenen Schwellen und ist oben nur gleitend geführt. In die Decke haben wir nicht eingegriffen.',
    result: 'Vollständig rückbaubar, weil der Mietvertrag nichts anderes zuließ.',
  },
  {
    slug: 'renovierung-neukoelln',
    title: 'Wohnungsrenovierung zum Mieterwechsel',
    location: 'Berlin Neukölln',
    year: 2025,
    category: 'Malerarbeiten',
    summary:
      'Vier Zimmer streichen, Risse schließen und ein Treppenhaus mitmachen, alles zwischen Auszug und Einzug.',
    duration: '9 Tage',
    area: '86 m²',
    scope: ['Risse schließen und spachteln', 'Raufaser und Anstrich', 'Lackierung der Innentüren', 'Treppenhaus im Erdgeschoss'],
    challenge:
      'Zwischen Auszug und Übergabe an den neuen Mieter lagen zwei Wochen. In dieser Zeit mussten auch Kleinreparaturen erledigt sein.',
    solution:
      'Wir haben raumweise gearbeitet statt gewerkeweise, damit die fertigen Zimmer nicht wieder zugestellt wurden. Die Türen kamen zum Lackieren in einen leeren Raum.',
    result: 'Übergabe zwei Tage vor dem vereinbarten Termin. Der Vermieter hatte keinen Mietausfall.',
    testimonial: {
      quote:
        'Ich hatte mit einer Woche Verzug gerechnet, weil das sonst immer so läuft. Diesmal nicht.',
      author: 'Vermieter, Berlin-Neukölln',
    },
  },
  {
    slug: 'parkett-altbau-schoeneberg',
    title: 'Parkett auf altem Dielenboden',
    location: 'Berlin Schöneberg',
    year: 2025,
    category: 'Bodenlegerarbeiten',
    summary:
      'Eichenparkett über einem schwingenden Altbaudielenboden, ohne dass der Bestand herausgerissen wurde.',
    duration: '6 Tage',
    area: '74 m²',
    scope: ['Dielenboden verschrauben und ausgleichen', 'Trittschalldämmung', 'Eichenparkett schwimmend', 'Sockelleisten'],
    challenge:
      'Der Dielenboden federte an mehreren Stellen und lag bis zu zwei Zentimeter uneben. Ein Parkett darauf hätte in den Fugen gearbeitet.',
    solution:
      'Wir haben die Dielen zunächst auf den Balken nachverschraubt, dann mit einer Ausgleichsschüttung und Trockenestrichplatten eine ebene Fläche hergestellt.',
    result: 'Der Boden liegt ruhig, und die alten Dielen sind unter dem Aufbau erhalten geblieben.',
  },
];

export const projectCategories = Array.from(new Set(projects.map((p) => p.category)));
