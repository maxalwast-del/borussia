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
  category: 'Altbausanierung' | 'Dachausbau' | 'Wohnungsumbau' | 'Decken & Akustik' | 'Bad & Feuchtraum';
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
    category: 'Altbausanierung',
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
    category: 'Dachausbau',
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
    category: 'Decken & Akustik',
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
    title: 'Wohnungszusammenlegung',
    location: 'Potsdam',
    year: 2024,
    category: 'Wohnungsumbau',
    summary: 'Zwei kleine Wohnungen wurden zu einer Familienwohnung, mit neuem Schallschutz zur Nachbarwohnung.',
    duration: '5 Wochen',
    area: '140 m²',
    scope: ['Vorsatzschalen mit Schallschutz', 'Neue Trennwände', 'Installationswand', 'Q4 in Wohnbereichen'],
    challenge: 'Die Wohnungstrennwand zum Nachbarn lag deutlich unter heutigem Schallschutzniveau.',
    solution:
      'Eine freistehende Vorsatzschale mit Mineralwolle, entkoppelt und ohne starre Verbindung zum Bestandsmauerwerk.',
    result: 'Der Schallschutz ist messbar besser, die Schlafräume merklich ruhiger.',
  },
  {
    slug: 'bad-feuchtraum-charlottenburg',
    title: 'Feuchtraumausbau Bad',
    location: 'Berlin Charlottenburg',
    year: 2024,
    category: 'Bad & Feuchtraum',
    summary: 'Installationsvorwand und Feuchtraumbeplankung als Untergrund für großformatige Fliesen.',
    duration: '8 Tage',
    area: '14 m²',
    scope: ['Installationsvorwand', 'Imprägnierte Bauplatten', 'Verbundabdichtung', 'Nischen und Ablagen'],
    challenge: 'Großformatfliesen verzeihen keine Toleranzen. Der Untergrund musste entsprechend eben werden.',
    solution: 'Engere Ständerabstände, doppelte Beplankung und eine Ebenheitskontrolle, bevor der Fliesenleger übernommen hat.',
    result: 'Der Fliesenleger konnte ohne Nacharbeit anfangen.',
  },
  {
    slug: 'buero-loft-friedrichshain',
    title: 'Büroloft mit Besprechungsboxen',
    location: 'Berlin Friedrichshain',
    year: 2023,
    category: 'Wohnungsumbau',
    summary: 'Drei freistehende Besprechungsboxen in einer offenen Hallenfläche, akustisch entkoppelt.',
    duration: '3 Wochen',
    area: '85 m²',
    scope: ['Freistehende Raum-in-Raum-Konstruktion', 'Doppelbeplankung', 'Glaselemente', 'Deckenanschluss entkoppelt'],
    challenge: 'Die Boxen sollten rückbaubar sein und die Sichtbetondecke nicht beschädigen.',
    solution: 'Die Konstruktion steht auf eigenen Schwellen und ist oben nur gleitend geführt. In die Decke haben wir nicht eingegriffen.',
    result: 'Vollständig rückbaubar, weil der Mietvertrag nichts anderes zuließ.',
  },
];

export const projectCategories = Array.from(new Set(projects.map((p) => p.category)));
