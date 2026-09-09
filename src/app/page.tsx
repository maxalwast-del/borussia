import Link from 'next/link';
import { company, serviceZones } from '@/config/site';
import { projects } from '@/content/projects';
import { Visual } from '@/components/visual';

const services = [
  {
    title: 'Trennwände & Grundrisse',
    text: 'Neue Raumaufteilung in Metallständerbauweise – mit Schallschutz, Türöffnungen und sauberem Anschluss an den Bestand.',
  },
  {
    title: 'Abgehängte Decken',
    text: 'Leitungen verschwinden, Akustik wird besser, Spots sitzen. Auch über unebenen Altbaudecken.',
  },
  {
    title: 'Dachgeschossausbau',
    text: 'Dämmung, luftdichte Dampfbremse, Dachschrägen und Kniestock – dokumentiert bis zum letzten Anschluss.',
  },
  {
    title: 'Vorsatzschalen & Schallschutz',
    text: 'Entkoppelte Schalen gegen Lärm von nebenan, Installationsvorwände fürs Bad.',
  },
  {
    title: 'Feuchtraum & Bad',
    text: 'Imprägnierte Platten, Verbundabdichtung, fliesenfertiger Untergrund nach Norm.',
  },
  {
    title: 'Spachtelarbeiten Q1 – Q4',
    text: 'Von der Grundverspachtelung bis zur Oberfläche für Streiflicht und glänzende Anstriche.',
  },
];

const reasons = [
  {
    title: 'Festpreis nach Aufmaß',
    text: 'Kein Stundenlohn ins Blaue. Nach dem Aufmaß bekommen Sie ein Angebot mit Positionen, Menge und Preis. Was drinsteht, gilt.',
  },
  {
    title: 'Ein Ansprechpartner',
    text: 'Vom Aufmaß bis zur Abnahme derselbe Meister. Kein Weiterreichen an wechselnde Kolonnen.',
  },
  {
    title: 'Baustelle bleibt bewohnbar',
    text: 'Staubschutzwände, Absaugung am Gerät, abends besenrein. Bei Sanierungen im bewohnten Zustand Standard.',
  },
  {
    title: 'Termine, die halten',
    text: 'Wir sagen nur zu, was wir mit eigenen Leuten schaffen. Verschiebt sich etwas, erfahren Sie es vorher, nicht danach.',
  },
];

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-32 h-[520px] w-[520px] rounded-full bg-accent-soft/70 blur-3xl" />
          <div className="absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-white/70 blur-3xl" />
        </div>

        <div className="container-page grid gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div className="animate-fade-up">
            <p className="eyebrow">Trockenbau · Berlin & Brandenburg</p>
            <h1 className="heading-xl mt-5">
              Neue Räume im
              <br />
              alten Grundriss.
            </h1>
            <p className="lede mt-6 max-w-xl">
              Wir bauen Trennwände, Decken und Dachgeschosse für Sanierung und Wohnungsumbau. Festpreis
              nach Aufmaß, ein Ansprechpartner, Baustelle abends besenrein.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/termin" className="btn-accent">
                Aufmaßtermin anfragen
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M11.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4L14.6 11H3a1 1 0 1 1 0-2h11.6l-3.3-3.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </Link>
              <a href={`tel:${company.phoneHref}`} className="btn-ghost">
                {company.phone}
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {[
                [`seit ${company.foundedYear}`, 'am Markt'],
                [`${company.teamSize} Leute`, 'im eigenen Team'],
                ['24 h', 'Rückmeldung auf Anfragen'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl tracking-tight">{value}</dt>
                  <dd className="mt-1 text-sm text-ink-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <Visual variant={0} label="Trockenbau-Trennwand im Rohbau" className="aspect-[4/3] rounded-card shadow-lift" />
            <div className="card absolute -bottom-6 -left-4 hidden max-w-[240px] p-5 sm:block">
              <p className="text-sm font-semibold">Termin online anfragen</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Sie sehen nur Zeiten, die im Kalender wirklich frei sind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="container-page py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Leistungen</p>
          <h2 className="heading-lg mt-4">Was wir bauen</h2>
          <p className="prose-body mt-4">
            Schwerpunkt Sanierung und Umbau im bewohnten Bestand. Neubau übernehmen wir, wenn es zeitlich passt.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="group bg-white p-7 transition hover:bg-gypsum">
              <h3 className="heading-md text-xl">{service.title}</h3>
              <p className="prose-body mt-3">{service.text}</p>
            </div>
          ))}
        </div>

        <Link href="/leistungen" className="mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-hover">
          Alle Leistungen im Detail
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* Warum wir */}
      <section className="bg-ink py-20 text-gypsum">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Arbeitsweise</p>
            <h2 className="heading-lg mt-4">Vier Dinge, auf die Sie sich verlassen können</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <div key={reason.title}>
                <span className="font-display text-sm text-accent">0{index + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{reason.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gypsum/65">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referenzen */}
      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">Referenzen</p>
            <h2 className="heading-lg mt-4">Zuletzt gebaut</h2>
          </div>
          <Link href="/referenzen" className="btn-ghost">
            Alle Projekte
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((project, index) => (
            <Link key={project.slug} href={`/referenzen/${project.slug}`} className="group">
              <Visual
                variant={index}
                label={project.title}
                className="aspect-[4/3] rounded-card transition duration-300 group-hover:shadow-lift"
              />
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                {project.category} · {project.location}
              </p>
              <h3 className="heading-md mt-2 text-xl group-hover:text-accent">{project.title}</h3>
              <p className="prose-body mt-2 line-clamp-3">{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Einsatzgebiet */}
      <section className="container-page pb-20">
        <div className="card overflow-hidden">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Einsatzgebiet</p>
              <h2 className="heading-lg mt-4">Berlin, Potsdam und das nähere Umland</h2>
              <p className="prose-body mt-4">
                Wir fahren nur so weit, wie wir Termine zuverlässig halten können. Das ist keine
                Bescheidenheit, sondern der Grund, warum unsere Zusagen stehen.
              </p>
              <Link href="/termin" className="btn-primary mt-7">
                Verfügbarkeit prüfen
              </Link>
            </div>
            <ul className="space-y-4">
              {serviceZones.map((zone) => (
                <li key={zone.id} className="rounded-xl bg-gypsum p-5">
                  <p className="font-semibold">{zone.label}</p>
                  <p className="prose-body mt-1.5">{zone.note}</p>
                  <p className="mt-2 text-sm font-medium text-accent">{zone.surcharge}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
