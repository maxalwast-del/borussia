import type { Metadata } from 'next';
import { ApplicationForm } from '@/components/application-form';
import { Icon, type IconName } from '@/components/icon';
import { LocalNav } from '@/components/local-nav';
import { PageHero, SectionTitle, delay } from '@/components/ui';
import { company, siteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Jobs',
  description:
    'Trockenbaumonteur, Vorarbeiter und Azubi (m/w/d) in Berlin und Brandenburg gesucht. Bewerbung in zwei Minuten, ohne Anschreiben.',
};

// [PLATZHALTER] Stellen an die tatsächliche Personalsituation anpassen.
const openings = [
  {
    title: 'Trockenbaumonteur (m/w/d)',
    type: 'Vollzeit',
    text: 'Sie stellen Ständerwerk, beplanken und spachteln. Selbstständig, ohne dass jemand danebenstehen muss.',
    requirements: [
      'Erfahrung im Trockenbau oder verwandtem Ausbaugewerk',
      'Führerschein Klasse B von Vorteil',
      'Deutsch für die Baustellenkommunikation',
    ],
  },
  {
    title: 'Vorarbeiter Trockenbau (m/w/d)',
    type: 'Vollzeit',
    text: 'Sie führen eine kleine Kolonne, halten den Kontakt zur Bauleitung und behalten Material und Termine im Blick.',
    requirements: [
      'Mehrjährige Erfahrung im Trockenbau',
      'Erfahrung in der Führung kleiner Teams',
      'Sicheres Lesen von Ausführungsplänen',
    ],
  },
  {
    title: 'Auszubildender Trockenbaumonteur (m/w/d)',
    type: 'Ausbildung',
    text: 'Drei Jahre Ausbildung bei einem festen Ausbilder, der auch dann zuständig bleibt, wenn etwas schiefgeht.',
    requirements: [
      'Schulabschluss',
      'Zuverlässigkeit und Pünktlichkeit',
      'Interesse am Handwerk',
    ],
  },
];

const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: 'euro', title: 'Lohn kommt pünktlich.', text: 'Zum Ersten ist das Geld da. Über Zuschläge diskutieren wir nicht, die rechnen wir ab.' },
  { icon: 'clock', title: 'Freitag ist um 14 Uhr Schluss.', text: 'Samstagsarbeit gibt es nur, wenn etwas brennt, und dann mit Zuschlag.' },
  { icon: 'wrench', title: 'Werkzeug vom Betrieb.', text: 'Maschinen, Werkzeug und Arbeitskleidung stellen wir. Sie müssen nichts mitbringen.' },
  { icon: 'people', title: 'Feste Kolonnen.', text: 'Sie arbeiten mit denselben Leuten. Das macht auf der Baustelle mehr aus, als man vorher denkt.' },
  { icon: 'graduation', title: 'Weiterbildung zahlt der Betrieb.', text: 'Meisterkurs, Staplerschein oder Brandschutzschulung. Wenn es zum Betrieb passt, übernehmen wir die Kosten.' },
  { icon: 'pin', title: 'Baustellen in der Region.', text: 'Berlin und Umland. Keine Wochenmontage, abends sind Sie zu Hause.' },
];

export default function JobsPage() {
  const jobSchema = openings.map((opening) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: opening.title,
    description: opening.text,
    employmentType: opening.type === 'Ausbildung' ? 'INTERN' : 'FULL_TIME',
    hiringOrganization: { '@type': 'Organization', name: company.legalName, sameAs: siteUrl },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: company.city,
        postalCode: company.zip,
        addressCountry: 'DE',
      },
    },
  }));

  return (
    <>
      <LocalNav
        title="Jobs"
        href="/jobs"
        cta={false}
        links={[
          { href: '#vorteile', label: 'Was wir bieten' },
          { href: '#stellen', label: 'Offene Stellen' },
          { href: '#bewerben', label: 'Bewerben' },
        ]}
      />

      <PageHero
        title={
          <>
            Wir suchen Leute,
            <br className="hidden sm:block" /> <span className="text-gradient">die bleiben wollen.</span>
          </>
        }
        lede="Sie brauchen kein Anschreiben und keinen Portal-Account. Formular ausfüllen oder per WhatsApp schreiben, wir melden uns."
      />

      <section id="vorteile" className="section scroll-mt-[52px] bg-black">
        <div className="container-page">
          <h2 className="t-section text-balance text-night-text" data-reveal>
            Was wir bieten.
            <span className="text-night-mute"> Und woran wir uns messen lassen.</span>
          </h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <li key={benefit.title} className="rounded-tile bg-night-tile p-8" data-reveal style={delay((index % 3) * 80)}>
                <Icon name={benefit.icon} className="h-8 w-8 text-accent-bright" strokeWidth={1.5} />
                <h3 className="t-card mt-5 text-night-text">{benefit.title}</h3>
                <p className="t-body mt-2 text-night-mute">{benefit.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-canvas py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-10">
          <div id="stellen" className="scroll-mt-[76px]">
            <SectionTitle>Offene Stellen.</SectionTitle>
            <ul className="mt-10 space-y-5">
              {openings.map((opening, index) => (
                <li key={opening.title} className="rounded-tile bg-white p-8" data-reveal style={delay(index * 60)}>
                  <p className="t-small font-semibold text-accent">{opening.type}</p>
                  <h3 className="t-card mt-1.5">{opening.title}</h3>
                  <p className="t-body mt-3 text-mute">{opening.text}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {opening.requirements.map((requirement) => (
                      <li key={requirement} className="flex items-start gap-3 t-small text-ink-soft">
                        <Icon name="check" className="mt-[2px] h-4 w-4 shrink-0 text-accent" strokeWidth={2.2} />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div id="bewerben" className="scroll-mt-[76px] lg:sticky lg:top-[76px]">
            <h2 className="t-title" data-reveal>
              In zwei Minuten bewerben.
            </h2>
            <p className="t-body mb-6 mt-2 text-mute" data-reveal>
              Zeugnisse und Lebenslauf können Sie nachreichen, wenn es passt.
            </p>
            <ApplicationForm positions={openings.map((opening) => opening.title)} />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />
    </>
  );
}
