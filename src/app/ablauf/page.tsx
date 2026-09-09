import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Ablauf',
  description: 'Von der Anfrage bis zur Abnahme: So läuft ein Trockenbauprojekt bei uns ab.',
};

const steps = [
  {
    title: 'Anfrage',
    text: 'Sie wählen online einen Termin oder rufen an. Wir bestätigen in der Regel innerhalb eines Werktages – oder sagen ehrlich ab, wenn wir keine Kapazität haben.',
    duration: 'Tag 0',
  },
  {
    title: 'Aufmaß vor Ort',
    text: 'Wir sehen uns die Räume an, messen auf, prüfen Untergründe und besprechen, was sinnvoll ist. Dauer meist eine Stunde. Kostenfrei im Einsatzgebiet.',
    duration: 'ca. 1 Woche später',
  },
  {
    title: 'Festpreisangebot',
    text: 'Positionen, Mengen, Qualitätsstufen und Preis – schriftlich. Was Sie nicht brauchen, steht nicht drin. Gültig 30 Tage.',
    duration: '3 – 5 Werktage nach Aufmaß',
  },
  {
    title: 'Terminplanung',
    text: 'Nach Auftragserteilung legen wir gemeinsam den Starttermin fest und stimmen die Reihenfolge mit anderen Gewerken ab.',
    duration: 'nach Auftrag',
  },
  {
    title: 'Ausführung',
    text: 'Staubschutz steht vor dem ersten Schnitt. Abends besenrein. Bei Abweichungen rufen wir an, bevor wir weiterbauen – nicht danach.',
    duration: 'je nach Umfang',
  },
  {
    title: 'Abnahme',
    text: 'Gemeinsamer Rundgang, Restpunkte werden protokolliert und innerhalb von zwei Wochen erledigt. Rechnung erst danach.',
    duration: 'zum Bauende',
  },
];

const faqs = [
  {
    q: 'Was kostet Trockenbau pro Quadratmeter?',
    a: 'Seriös lässt sich das erst nach dem Aufmaß sagen. Der Preis hängt an Beplankungsart, Schallschutzanforderung, Spachtelqualität und Zugänglichkeit der Baustelle. Eine einfache Trennwand liegt in einem völlig anderen Bereich als eine entkoppelte Vorsatzschale mit Q4-Oberfläche. Deshalb messen wir kostenfrei auf, statt Zahlen zu raten.',
  },
  {
    q: 'Kann ich während der Arbeiten in der Wohnung bleiben?',
    a: 'In den meisten Fällen ja. Wir arbeiten abschnittsweise mit Staubschutzwänden und Absaugung. Bei größeren Umbauten mit Grundrissänderung ist ein Auszug für einzelne Wochen manchmal die entspanntere Lösung – das besprechen wir beim Aufmaß offen.',
  },
  {
    q: 'Übernehmen Sie auch Elektro und Malerarbeiten?',
    a: 'Trockenbau ist unser Gewerk. Für Elektro, Sanitär und Malerarbeiten arbeiten wir mit festen Partnerbetrieben aus der Region und koordinieren die Reihenfolge, damit niemand auf den anderen wartet.',
  },
  {
    q: 'Welche Spachtelqualität brauche ich?',
    a: 'Q2 reicht für gewöhnliche Anstriche und Raufaser. Q3 ist sinnvoll bei glatten Anstrichen, Q4 bei Streiflicht durch große Fenster oder glänzenden Beschichtungen. Wir schauen uns die Lichtsituation vor Ort an und empfehlen die Stufe, die Sie wirklich brauchen.',
  },
  {
    q: 'Wie schnell können Sie anfangen?',
    a: 'Die aktuelle Vorlaufzeit sagen wir Ihnen beim Aufmaß verbindlich. Kleinere Arbeiten schieben sich manchmal kurzfristig dazwischen, größere Projekte planen wir mit einigen Wochen Vorlauf.',
  },
  {
    q: 'Kann ich Handwerkerleistungen steuerlich absetzen?',
    a: 'Für Privathaushalte sind Lohn-, Fahrt- und Maschinenkosten von Handwerkerleistungen nach § 35a EStG anteilig steuerlich begünstigt; Materialkosten zählen nicht dazu. Unsere Rechnungen weisen die Lohnanteile deshalb getrennt aus. Zu Ihrer konkreten Situation berät Ihr Steuerbüro.',
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
        lede="Keine Überraschungen: Sie wissen zu jedem Zeitpunkt, was als Nächstes passiert und wer dafür zuständig ist."
      />

      <section className="container-page py-16">
        <ol className="relative space-y-10 border-l border-ink/15 pl-8 sm:pl-10">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="absolute -left-[41px] grid h-8 w-8 place-items-center rounded-full bg-ink text-sm font-semibold text-gypsum sm:-left-[49px]">
                {index + 1}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{step.duration}</p>
              <h2 className="heading-md mt-1.5 text-xl">{step.title}</h2>
              <p className="prose-body mt-2 max-w-2xl">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pb-20">
        <h2 className="heading-lg">Häufige Fragen</h2>
        <div className="mt-8 divide-y divide-ink/10 overflow-hidden rounded-card border border-ink/10 bg-white">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-6 sm:p-7">
              <summary className="flex cursor-pointer items-start justify-between gap-6 font-semibold marker:content-['']">
                {faq.q}
                <span className="mt-1 shrink-0 text-accent transition group-open:rotate-45" aria-hidden="true">
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
          <Link href="/termin" className="btn-accent mt-7">
            Termin anfragen
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
