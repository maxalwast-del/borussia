import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { ApplicationForm } from '@/components/application-form';
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

const benefits = [
  { title: 'Lohn kommt pünktlich', text: 'Zum Ersten ist das Geld da. Über Zuschläge diskutieren wir nicht, die rechnen wir ab.' },
  { title: 'Freitag ist um 14 Uhr Schluss', text: 'Samstagsarbeit gibt es nur, wenn etwas brennt, und dann mit Zuschlag.' },
  { title: 'Werkzeug vom Betrieb', text: 'Maschinen, Werkzeug und Arbeitskleidung stellen wir. Sie müssen nichts mitbringen.' },
  { title: 'Feste Kolonnen', text: 'Sie arbeiten mit denselben Leuten. Das macht auf der Baustelle mehr aus, als man vorher denkt.' },
  { title: 'Weiterbildung zahlt der Betrieb', text: 'Meisterkurs, Staplerschein oder Brandschutzschulung. Wenn es zum Betrieb passt, übernehmen wir die Kosten.' },
  { title: 'Baustellen in der Region', text: 'Berlin und Umland. Keine Wochenmontage, abends sind Sie zu Hause.' },
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
      <PageHeader
        eyebrow="Jobs"
        title="Wir suchen Leute, die bleiben wollen"
        lede="Sie brauchen kein Anschreiben und keinen Portal-Account. Formular ausfüllen oder per WhatsApp schreiben, wir melden uns."
      />

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <h2 className="heading-lg">Offene Stellen</h2>
            <div className="mt-8 space-y-5">
              {openings.map((opening) => (
                <article key={opening.title} className="card p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="heading-md text-xl">{opening.title}</h3>
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-hover">
                      {opening.type}
                    </span>
                  </div>
                  <p className="prose-body mt-3">{opening.text}</p>
                  <ul className="mt-4 space-y-2">
                    {opening.requirements.map((requirement) => (
                      <li key={requirement} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <h2 className="heading-lg mt-16">Was wir bieten</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title}>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="prose-body mt-1.5">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <h2 className="heading-md">In zwei Minuten bewerben</h2>
            <p className="prose-body mb-5 mt-2">Zeugnisse und Lebenslauf können Sie nachreichen, wenn es passt.</p>
            <ApplicationForm positions={openings.map((opening) => opening.title)} />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />
    </>
  );
}
