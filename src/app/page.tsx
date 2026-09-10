import Link from 'next/link';
import { company, serviceZones, trades } from '@/config/site';
import { TradeIcon } from '@/components/trade-icon';
import { SloganRule } from '@/components/logo';
import { projects } from '@/content/projects';
import { Visual } from '@/components/visual';

const reasons = [
  {
    title: 'Festpreis nach Aufmaß',
    text: 'Nach dem Aufmaß bekommen Sie ein Angebot mit Positionen, Mengen und Preisen. Daran halten wir uns auch dann, wenn wir uns beim Aufwand verschätzt haben.',
  },
  {
    title: 'Ein Ansprechpartner',
    text: 'Vom Aufmaß bis zur Abnahme betreut Sie derselbe Meister. Sie müssen Ihr Projekt nicht dreimal neu erklären.',
  },
  {
    title: 'Baustelle bleibt bewohnbar',
    text: 'Staubschutzwände und Absaugung direkt am Gerät. Abends räumen wir so weit auf, dass Sie die Räume wieder benutzen können.',
  },
  {
    title: 'Termine, die halten',
    text: 'Wir sagen nur zu, was wir mit eigenen Leuten schaffen. Wenn sich doch etwas verschiebt, rufen wir an, bevor Sie vergeblich warten.',
  },
];

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-32 h-[520px] w-[520px] rounded-full bg-brand-soft/70 blur-3xl" />
          <div className="absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-white/70 blur-3xl" />
        </div>

        <div className="container-page grid gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div className="animate-fade-up">
            <SloganRule />
            <h1 className="heading-xl mt-5">
              Neue Räume im
              <br />
              alten Grundriss.
            </h1>
            <p className="lede mt-6 max-w-xl">
              Trockenbau, Fliesen, Maler, Innenausbau, Sanierung und Boden in Berlin und
              Brandenburg. Nach dem Aufmaß bekommen Sie einen Festpreis über alle Gewerke, und
              bis zur Abnahme haben Sie denselben Ansprechpartner.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/termin" className="btn-brand">
                Aufmaßtermin anfragen
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M11.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4L14.6 11H3a1 1 0 1 1 0-2h11.6l-3.3-3.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </Link>
              <a href={`tel:${company.phoneHref}`} className="btn-ghost">
                {company.phone}
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-navy/10 pt-8">
              {[
                [`seit ${company.foundedYear}`, 'am Markt'],
                [`${company.teamSize} Leute`, 'im eigenen Team'],
                ['24 h', 'Rückmeldung auf Anfragen'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl tracking-tight">{value}</dt>
                  <dd className="mt-1 text-sm text-navy-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <Visual variant={0} label="Trockenbau-Trennwand im Rohbau" className="aspect-[4/3] rounded-card shadow-lift" />
            <div className="card absolute -bottom-6 -left-4 hidden max-w-[240px] p-5 sm:block">
              <p className="text-sm font-semibold">Termin online anfragen</p>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-muted">
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
          <h2 className="heading-lg mt-4">Sechs Gewerke, ein Ansprechpartner</h2>
          <p className="prose-body mt-4">
            Wer eine Wohnung saniert, koordiniert sonst vier Betriebe und wartet auf jeden einzelnen.
            Bei uns kommt alles aus einem Haus, und die Reihenfolge planen wir gleich mit.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map((trade) => (
            <div key={trade.id} className="group bg-white p-7 transition hover:bg-paper">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                <TradeIcon id={trade.id} className="h-5 w-5" />
              </span>
              <h3 className="heading-md mt-5 text-xl">{trade.label}</h3>
              <p className="prose-body mt-2.5">{trade.short}</p>
            </div>
          ))}
        </div>

        <Link href="/leistungen" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-hover">
          Alle Gewerke im Detail
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* Warum wir */}
      <section className="bg-navy py-20 text-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Arbeitsweise</p>
            <h2 className="heading-lg mt-4">Wobei wir uns festlegen</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <div key={reason.title}>
                <span className="font-display text-sm text-brand">0{index + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{reason.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/65">{reason.text}</p>
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
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
                {project.category} · {project.location}
              </p>
              <h3 className="heading-md mt-2 text-xl group-hover:text-brand">{project.title}</h3>
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
                Wir fahren nur so weit, wie wir Termine zuverlässig halten können. Weiter draußen
                wird die Anfahrt zum Risiko für alle anderen Termine des Tages.
              </p>
              <Link href="/termin" className="btn-primary mt-7">
                Verfügbarkeit prüfen
              </Link>
            </div>
            <ul className="space-y-4">
              {serviceZones.map((zone) => (
                <li key={zone.id} className="rounded-xl bg-paper p-5">
                  <p className="font-semibold">{zone.label}</p>
                  <p className="prose-body mt-1.5">{zone.note}</p>
                  <p className="mt-2 text-sm font-medium text-brand">{zone.surcharge}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
