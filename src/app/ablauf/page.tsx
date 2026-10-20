import type { Metadata } from 'next';
import Link from 'next/link';
import { company } from '@/config/site';
import { Icon } from '@/components/icon';
import { LocalNav } from '@/components/local-nav';
import { PageHero, SectionTitle, delay } from '@/components/ui';

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
      <LocalNav
        title="Ablauf"
        href="/ablauf"
        links={[
          { href: '#schritte', label: 'Schritte' },
          { href: '#fragen', label: 'Häufige Fragen' },
        ]}
      />

      <PageHero
        title={
          <>
            Von der Anfrage
            <br className="hidden sm:block" /> <span className="text-gradient">bis zur Abnahme.</span>
          </>
        }
        lede="Sie wissen zu jedem Zeitpunkt, was als Nächstes passiert und wer dafür zuständig ist."
      />

      <section id="schritte" className="scroll-mt-[52px] bg-canvas py-16 sm:py-24" aria-label="Schritte">
        <ol className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col rounded-tile bg-white p-8" data-reveal style={delay((index % 3) * 80)}>
              <span className="text-gradient text-[3.5rem] font-semibold leading-none tracking-[-0.02em]" aria-hidden="true">
                {index + 1}
              </span>
              <h2 className="t-title mt-6">
                <span className="sr-only">Schritt {index + 1}: </span>
                {step.title}
              </h2>
              <p className="t-small mt-1.5 font-semibold text-accent">{step.duration}</p>
              <p className="t-body mt-3 text-mute">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="fragen" className="section scroll-mt-[52px]">
        <div className="container-text">
          <SectionTitle>Häufige Fragen.</SectionTitle>
          <div className="mt-10 border-t border-line" data-reveal style={delay(80)}>
            {faqs.map((faq) => (
              <details key={faq.q} className="faq group border-b border-line">
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-[1.1875rem] font-semibold leading-[1.3] tracking-[-0.005em] transition-colors hover:text-accent sm:text-[1.3125rem]">
                  {faq.q}
                  <Icon name="plus" className="faq-icon mt-1 h-5 w-5 shrink-0 text-ink-soft" strokeWidth={1.8} />
                </summary>
                <p className="t-body -mt-1 pb-7 pr-10 text-ink-soft">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-page">
          <div className="tile bg-canvas px-8 py-14 text-center sm:px-12 sm:py-20" data-reveal>
            <h2 className="t-section text-balance">
              Frage nicht dabei?
              <span className="text-mute"> Rufen Sie an.</span>
            </h2>
            <p className="t-intro mx-auto mt-5 max-w-[560px] text-pretty text-mute">
              Oder buchen Sie eine kostenfreie telefonische Erstberatung.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/termin" className="btn-primary">
                Termin anfragen
              </Link>
              <a href={`tel:${company.phoneHref}`} className="btn-secondary">
                <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} />
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
