import Link from 'next/link';
import { company, serviceZones, trades } from '@/config/site';
import { TradeIcon } from '@/components/trade-icon';
import { SloganRule } from '@/components/logo';
import { projects } from '@/content/projects';
import { Visual } from '@/components/visual';
import { ZoneCheck } from '@/components/zone-check';

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

/** Pfeil für weiterführende Hinweise. Wandert beim Zeigen ein Stück nach rechts. */
function Arrow({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${className} transition-transform duration-200 group-hover:translate-x-0.5`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h9M8.5 4l4 4-4 4" />
    </svg>
  );
}

export default function HomePage() {
  const featured = projects.slice(0, 3);
  const voices = projects.filter((project) => project.testimonial);

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

            {/* Die Beschriftungen bleiben einzeilig. Reicht die Breite nicht für
                beide Schaltflächen, rutscht die zweite in die nächste Zeile. */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/termin" className="btn-brand whitespace-nowrap">
                Aufmaßtermin anfragen
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M11.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4L14.6 11H3a1 1 0 1 1 0-2h11.6l-3.3-3.3a1 1 0 0 1 0-1.4Z" />
                </svg>
              </Link>
              <a
                href={`tel:${company.phoneHref}`}
                className="btn-ghost whitespace-nowrap"
                aria-label={`Anrufen: ${company.phone}`}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6.6 3.5 8 6.4 6.4 7.9a9.4 9.4 0 0 0 5.7 5.7l1.5-1.6 2.9 1.4v2.8c0 .6-.5 1.1-1.1 1.1A13.6 13.6 0 0 1 2.7 3.6c0-.6.5-1.1 1.1-1.1h2.8Z" />
                </svg>
                {company.phone}
              </a>
            </div>

            <p className="mt-4 flex items-start gap-2.5 text-sm leading-snug text-navy-muted">
              <svg
                viewBox="0 0 20 20"
                className="mt-0.5 h-4 w-4 flex-none text-brand"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m4 10.5 4 4 8-9" />
              </svg>
              <span>Aufmaß und Beratung vor Ort sind im Einsatzgebiet kostenfrei.</span>
            </p>

            {/* Unter 560px stehen die Kennzahlen als Liste untereinander.
                Dreispaltig brechen "seit 2009" und "12 Leute" sonst im Wert um. */}
            <dl className="mt-9 grid max-w-lg border-t border-navy/10 min-[560px]:mt-12 min-[560px]:grid-cols-3 min-[560px]:gap-6 min-[560px]:pt-8">
              {[
                [`seit ${company.foundedYear}`, 'am Markt'],
                [`${company.teamSize} Leute`, 'im eigenen Team'],
                ['24 h', 'Rückmeldung auf Anfragen'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4 border-b border-navy/10 py-3.5 min-[560px]:block min-[560px]:border-b-0 min-[560px]:py-0"
                >
                  <dt className="font-display text-2xl tracking-tight">{value}</dt>
                  <dd className="text-right text-sm text-navy-muted min-[560px]:mt-1 min-[560px]:text-left">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <Visual variant={0} label="Trockenbau-Trennwand im Rohbau" className="aspect-[4/3] rounded-card shadow-lift" />
            {/* Auf schmalen Geräten sitzt die Karte unter dem Bild. Vorher war sie
                ausgeblendet, damit fehlte der Hinweis auf die echte Verfügbarkeit. */}
            <div className="card mt-4 max-w-none p-5 sm:absolute sm:-bottom-6 sm:-left-4 sm:mt-0 sm:max-w-[240px]">
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
            <Link
              key={trade.id}
              href={`/leistungen#${trade.id}`}
              className="group flex flex-col bg-white p-7 transition hover:bg-paper"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                <TradeIcon id={trade.id} className="h-5 w-5" />
              </span>
              <h3 className="heading-md mt-5 text-xl">{trade.label}</h3>
              <p className="prose-body mt-2.5">{trade.short}</p>
              {/* mt-auto hält den Hinweis in allen Kacheln einer Reihe auf gleicher Höhe. */}
              <span className="mt-auto inline-flex items-center gap-1.5 pt-3.5 text-sm font-semibold text-brand">
                Zum Gewerk
                <Arrow />
              </span>
            </Link>
          ))}
        </div>

        <Link href="/leistungen" className="group mt-8 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-hover">
          Alle Gewerke im Detail
          <Arrow />
        </Link>
      </section>

      {/* Warum wir */}
      <section className="bg-navy py-20 text-paper">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-bright">Arbeitsweise</p>
            <h2 className="heading-lg mt-4">Wobei wir uns festlegen</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <div key={reason.title}>
                <span className="font-display text-sm font-semibold text-brand-bright">0{index + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{reason.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/65">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kundenstimmen. Jede Karte führt auf das Projekt, aus dem sie stammt. */}
      <section className="container-page py-20">
        <p className="eyebrow">Kundenstimmen</p>
        <h2 className="heading-lg mt-4">Was Auftraggeber hinterher gesagt haben</h2>
        <div className="mt-12 grid gap-6 min-[900px]:grid-cols-3">
          {voices.map((project) => {
            // Letztes Wort und Pfeil bleiben zusammen, sonst steht der Pfeil
            // allein in der nächsten Zeile.
            const words = project.title.split(' ');
            const lastWord = words.pop();
            return (
            <Link
              key={project.slug}
              href={`/referenzen/${project.slug}`}
              className="card group flex flex-col p-7 transition hover:border-navy/25 hover:shadow-lift"
            >
              <p className="font-display text-[1.06rem] leading-normal">
                „{project.testimonial!.quote}“
              </p>
              <p className="mt-4 text-sm text-navy-muted">{project.testimonial!.author}</p>
              <span className="mt-auto pt-4 text-sm font-semibold text-brand">
                {words.join(' ')}{' '}
                <span className="whitespace-nowrap">
                  {lastWord}
                  <Arrow className="ml-1.5 inline h-3.5 w-3.5 align-[-2px]" />
                </span>
              </span>
            </Link>
            );
          })}
        </div>
      </section>

      {/* Referenzen */}
      <section className="container-page pb-20">
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
            <Link key={project.slug} href={`/referenzen/${project.slug}`} className="group flex flex-col">
              <Visual
                variant={index}
                label={project.title}
                className="aspect-[4/3] rounded-card transition duration-300 group-hover:shadow-lift"
              />
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
                {project.category} · {project.location}
              </p>
              <h3 className="heading-md mt-2 text-xl group-hover:text-brand">{project.title}</h3>
              {/* Harte Zahlen vor dem Fließtext: Fläche und Bauzeit sind konkreter
                  als jede Beschreibung. */}
              <p className="mt-2.5 text-[13px] font-medium tabular-nums text-navy-soft">
                {project.area} · {project.duration} · {project.year}
              </p>
              <p className="prose-body mt-2 line-clamp-3">{project.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-3.5 text-sm font-semibold text-brand">
                Projekt ansehen
                <Arrow />
              </span>
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
              <ZoneCheck />
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
