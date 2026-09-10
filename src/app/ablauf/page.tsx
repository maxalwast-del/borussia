import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Ablauf',
  description: 'Von der Anfrage bis zur Abnahme: So läuft ein Projekt bei uns ab.',
};

const steps = [
  {
    title: 'Anfrage',
    text: 'Sie wählen online einen Termin oder rufen an. Meist bestätigen wir innerhalb eines Werktages. Wenn wir keine Kapazität haben, sagen wir das auch so.',
    duration: 'Tag 0',
  },
  {
    title: 'Aufmaß vor Ort',
    text: 'Wir sehen uns die Räume an, messen auf und prüfen die Untergründe. Das dauert meist eine Stunde und kostet im Einsatzgebiet nichts.',
    duration: 'meist eine Woche später',
  },
  {
    title: 'Festpreisangebot',
    text: 'Sie bekommen Positionen, Mengen, Qualitätsstufen und Preis schriftlich. Was Sie nicht brauchen, nehmen wir gar nicht erst auf. Das Angebot gilt 30 Tage.',
    duration: 'drei bis fünf Werktage nach dem Aufmaß',
  },
  {
    title: 'Terminplanung',
    text: 'Nach Auftragserteilung legen wir gemeinsam den Starttermin fest und stimmen die Reihenfolge mit anderen Gewerken ab.',
    duration: 'nach Auftrag',
  },
  {
    title: 'Ausführung',
    text: 'Der Staubschutz steht, bevor der erste Schnitt fällt. Wenn wir auf etwas Unerwartetes stoßen, rufen wir an, bevor wir weiterbauen.',
    duration: 'je nach Umfang',
  },
  {
    title: 'Abnahme',
    text: 'Wir gehen gemeinsam durch, schreiben offene Restpunkte auf und erledigen sie innerhalb von zwei Wochen. Die Rechnung kommt erst danach.',
    duration: 'zum Bauende',
  },
];

const faqs = [
  {
    q: 'Was kostet das pro Quadratmeter?',
    a: 'Ehrlich gesagt lässt sich das erst nach dem Aufmaß beantworten. Bei einer Trennwand hängt der Preis an Beplankung, Schallschutz und Spachtelqualität, beim Boden am Zustand des Estrichs, beim Bad an Format und Abdichtung. Dazu kommt, wie gut wir mit Material an die Baustelle kommen. Deshalb messen wir kostenfrei auf, statt am Telefon Zahlen zu raten.',
  },
  {
    q: 'Kann ich während der Arbeiten in der Wohnung bleiben?',
    a: 'Meistens ja. Wir arbeiten abschnittsweise mit Staubschutzwänden und Absaugung. Bei größeren Umbauten mit Grundrissänderung ist ein Auszug für ein paar Wochen oft die entspanntere Lösung. Das sprechen wir beim Aufmaß offen an.',
  },
  {
    q: 'Welche Gewerke machen Sie selbst?',
    a: 'Trockenbau, Fliesen, Maler, Innenausbau und Boden führen wir mit eigenen Leuten aus. Für Elektro und Sanitär haben wir feste Partnerbetriebe aus der Region. Die Reihenfolge stimmen wir ab, damit nicht einer auf den anderen wartet.',
  },
  {
    q: 'Welche Spachtelqualität brauche ich?',
    a: 'Q2 reicht für gewöhnliche Anstriche und Raufaser. Q3 ist bei glatten Anstrichen sinnvoll, Q4 bei Streiflicht durch große Fenster oder bei glänzenden Beschichtungen. Wir schauen uns die Lichtsituation vor Ort an. In den meisten Wohnungen ist Q4 rausgeworfenes Geld.',
  },
  {
    q: 'Wie schnell können Sie anfangen?',
    a: 'Die aktuelle Vorlaufzeit nennen wir Ihnen beim Aufmaß verbindlich. Kleinere Arbeiten schieben sich manchmal kurzfristig dazwischen, für größere Projekte brauchen wir einige Wochen Vorlauf.',
  },
  {
    q: 'Kann ich Handwerkerleistungen steuerlich absetzen?',
    a: 'Für Privathaushalte sind Lohn-, Fahrt- und Maschinenkosten nach § 35a EStG anteilig steuerlich begünstigt. Materialkosten zählen nicht dazu. Unsere Rechnungen weisen den Lohnanteil deshalb getrennt aus, und wir bitten um Überweisung statt Barzahlung, weil das Finanzamt sonst nicht mitspielt. Was in Ihrem Fall herauskommt, sagt Ihnen Ihr Steuerbüro.',
  },
];

export default function AblaufPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="Ablauf"
        title="Von der Anfrage bis zur Abnahme"
        lede="Sie wissen zu jedem Zeitpunkt, was als Nächstes passiert und wer dafür zuständig ist."
      />

      <section className="container-page py-16">
        <ol className="relative space-y-10 border-l border-navy/15 pl-8 sm:pl-10">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="absolute -left-[41px] grid h-8 w-8 place-items-center rounded-full bg-navy text-sm font-semibold text-paper sm:-left-[49px]">
                {index + 1}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{step.duration}</p>
              <h2 className="heading-md mt-1.5 text-xl">{step.title}</h2>
              <p className="prose-body mt-2 max-w-2xl">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pb-20">
        <h2 className="heading-lg">Häufige Fragen</h2>
        <div className="mt-8 divide-y divide-navy/10 overflow-hidden rounded-card border border-navy/10 bg-white">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-6 sm:p-7">
              <summary className="flex cursor-pointer items-start justify-between gap-6 font-semibold marker:content-['']">
                {faq.q}
                <span className="mt-1 shrink-0 text-brand transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="prose-body mt-3 max-w-3xl">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="card mt-14 p-8 text-center sm:p-12">
          <h2 className="heading-lg">Frage nicht dabei?</h2>
          <p className="prose-body mx-auto mt-3 max-w-lg">
            Rufen Sie an oder buchen Sie eine kostenfreie telefonische Erstberatung.
          </p>
          <Link href="/termin" className="btn-brand mt-7">
            Termin anfragen
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
