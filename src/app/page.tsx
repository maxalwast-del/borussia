import Link from 'next/link';
import { company, serviceZones, trades } from '@/config/site';
import { projects } from '@/content/projects';
import { Artwork } from '@/components/artwork';
import { FloorPlan, FloorPlanLegend } from '@/components/floor-plan';
import { Gallery } from '@/components/gallery';
import { Icon, type IconName } from '@/components/icon';
import { LogoMark } from '@/components/logo';
import { ProjectCard } from '@/components/project-card';
import { MoreLink, SectionTitle, delay } from '@/components/ui';

const reasons: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'euro',
    title: 'Festpreis nach Aufmaß.',
    text: 'Nach dem Aufmaß bekommen Sie ein Angebot mit Positionen, Mengen und Preisen. Daran halten wir uns auch dann, wenn wir uns beim Aufwand verschätzt haben.',
  },
  {
    icon: 'person',
    title: 'Ein Ansprechpartner.',
    text: 'Vom Aufmaß bis zur Abnahme betreut Sie derselbe Meister. Sie müssen Ihr Projekt nicht dreimal neu erklären.',
  },
  {
    icon: 'home',
    title: 'Baustelle bleibt bewohnbar.',
    text: 'Staubschutzwände und Absaugung direkt am Gerät. Abends räumen wir so weit auf, dass Sie die Räume wieder benutzen können.',
  },
  {
    icon: 'calendar-check',
    title: 'Termine, die halten.',
    text: 'Wir sagen nur zu, was wir mit eigenen Leuten schaffen. Wenn sich doch etwas verschiebt, rufen wir an, bevor Sie vergeblich warten.',
  },
];

const stats = [
  { above: 'Seit', value: String(company.foundedYear), below: 'am Markt' },
  { above: 'Ein Team aus', value: String(company.teamSize), below: 'eigenen Leuten' },
  { above: 'Rückmeldung in', value: '24 h', below: 'auf Anfragen' },
];

/** Nur Dekoration: zeigt, wie die Terminauswahl aussieht. */
const previewDays = [
  { weekday: 'Dienstag', slots: ['08:00', '10:30', '13:00'], selected: '' },
  { weekday: 'Mittwoch', slots: ['09:30', '11:00', '14:00'], selected: '11:00' },
];

export default function HomePage() {
  return (
    <>
      {/* Titel */}
      <section className="overflow-hidden pt-14 sm:pt-20">
        <div className="container-page text-center">
          <p className="t-eyebrow text-mute" data-reveal>
            {company.sloganParts.join(' · ')}
          </p>
          <h1 className="t-hero mt-3 text-balance" data-reveal style={delay(60)}>
            Neue Räume im <br className="hidden sm:block" />
            <span className="text-gradient">alten Grundriss.</span>
          </h1>
          <p className="t-intro mx-auto mt-6 max-w-[640px] text-pretty text-mute" data-reveal style={delay(120)}>
            Trockenbau, Fliesen, Maler, Innenausbau, Sanierung und Boden in Berlin und Brandenburg.
            Ein Festpreis über alle Gewerke, und bis zur Abnahme derselbe Ansprechpartner.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" data-reveal style={delay(180)}>
            <Link href="/termin" className="btn-primary">
              Aufmaßtermin anfragen
            </Link>
            <Link href="/leistungen" className="btn-secondary">
              Leistungen ansehen
            </Link>
          </div>
        </div>

        <div className="container-wide mt-14 sm:mt-20" data-reveal style={delay(240)}>
          <div className="tile relative bg-canvas px-3 pb-7 pt-8 sm:px-12 sm:pb-10 sm:pt-14">
            <FloorPlan className="mx-auto w-full max-w-[920px]" />
            <FloorPlanLegend className="mt-5 justify-center sm:mt-7" />
          </div>
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="container-page py-20 sm:py-28" aria-label="Kennzahlen">
        <div className="grid grid-cols-3 gap-3 text-center sm:gap-6">
          {stats.map((stat, index) => (
            <div key={stat.below} data-reveal style={delay(index * 90)}>
              <p className="text-[0.8125rem] font-semibold leading-tight text-ink-soft sm:t-body">{stat.above}</p>
              <p className="text-gradient mt-1 text-[2.5rem] font-semibold leading-none tracking-[-0.02em] sm:text-[4.5rem] lg:text-[5rem]">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.8125rem] leading-tight text-mute sm:t-body">{stat.below}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leistungen */}
      <section className="section bg-canvas">
        <div className="container-page">
          <SectionTitle center sub="Ein Ansprechpartner.">
            Sechs Gewerke.
          </SectionTitle>
          <p className="t-intro mx-auto mt-5 max-w-[692px] text-pretty text-center text-mute" data-reveal style={delay(80)}>
            Wer eine Wohnung saniert, koordiniert sonst vier Betriebe und wartet auf jeden einzelnen.
            Bei uns kommt alles aus einem Haus, und die Reihenfolge planen wir gleich mit.
          </p>

          <ul className="-mx-6 mt-12 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-6 pt-2 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
            {trades.map((trade, index) => (
              <li key={trade.id} className="w-[80%] shrink-0 snap-start sm:w-auto" data-reveal style={delay((index % 3) * 80)}>
                <Link
                  href={`/leistungen#${trade.id}`}
                  className="card-link group flex h-full flex-col overflow-hidden rounded-tile bg-white"
                >
                  <Artwork trade={trade.id} className="aspect-[16/10]" glyphClassName="w-[21%]" />
                  <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
                    <h3 className="t-title">{trade.label}</h3>
                    <p className="t-body mt-2 text-mute">{trade.short}</p>
                    <span className="mt-auto inline-flex items-center gap-0.5 pt-5 text-accent group-hover:underline">
                      Mehr erfahren
                      <Icon name="chevron-right" className="h-[0.78em] w-[0.78em] translate-y-[0.5px]" strokeWidth={2.6} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Arbeitsweise */}
      <section className="section bg-black">
        <div className="container-page">
          <h2 className="t-section mx-auto max-w-[760px] text-balance text-center text-white" data-reveal>
            Wobei wir uns festlegen.
            <span className="text-night-mute"> Damit Sie wissen, woran Sie sind.</span>
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <div key={reason.title} className="rounded-tile bg-night-tile p-8 sm:p-10" data-reveal style={delay((index % 2) * 80)}>
                <Icon name={reason.icon} className="h-9 w-9 text-accent-bright" strokeWidth={1.5} />
                <h3 className="t-title mt-6 text-night-text">{reason.title}</h3>
                <p className="t-body mt-3 text-night-mute">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referenzen */}
      <section className="section overflow-hidden">
        <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <SectionTitle sub="Und was daran schwierig war." className="max-w-[640px]">
            Zuletzt gebaut.
          </SectionTitle>
          <div className="shrink-0 sm:pb-2" data-reveal>
            <MoreLink href="/referenzen">Alle Referenzen</MoreLink>
          </div>
        </div>
        <div className="mt-8" data-reveal style={delay(80)}>
          <Gallery label="Referenzen">
            {projects.slice(0, 6).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </Gallery>
        </div>
      </section>

      {/* Termin und Einsatzgebiet */}
      <section className="section bg-canvas">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <div className="tile flex flex-col bg-white p-8 sm:p-12" data-reveal>
            <Icon name="calendar" className="h-10 w-10 text-accent" strokeWidth={1.5} />
            <h2 className="t-title mt-6 sm:text-[2rem] sm:leading-[1.125]">
              Termin online.
              <span className="text-mute"> Nur Zeiten, die wirklich frei sind.</span>
            </h2>
            <p className="t-body mt-4 text-mute">
              Die Anfrage liest direkt aus unserem Kalender. Die Fahrzeit zwischen den Baustellen ist
              schon abgezogen, und die gewählte Zeit ist sofort für andere gesperrt.
            </p>
            <div aria-hidden="true" className="mt-8 grid grid-cols-2 gap-3">
              {previewDays.map((day) => (
                <div key={day.weekday} className="rounded-card bg-canvas p-4">
                  <p className="t-small font-semibold">{day.weekday}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {day.slots.map((slot) => (
                      <span
                        key={slot}
                        className={`rounded-full px-3 py-1.5 t-caption tabular-nums ${
                          day.selected === slot ? 'bg-accent font-medium text-white' : 'border border-line bg-white text-ink'
                        }`}
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-10">
              <Link href="/termin" className="btn-primary">
                Verfügbarkeit prüfen
              </Link>
            </div>
          </div>

          <div className="tile flex flex-col bg-white p-8 sm:p-12" data-reveal style={delay(80)}>
            <Icon name="pin" className="h-10 w-10 text-accent" strokeWidth={1.5} />
            <h2 className="t-title mt-6 sm:text-[2rem] sm:leading-[1.125]">
              Berlin, Potsdam
              <span className="text-mute"> und das nähere Umland.</span>
            </h2>
            <p className="t-body mt-4 text-mute">
              Wir fahren nur so weit, wie wir Termine zuverlässig halten können. Weiter draußen wird
              die Anfahrt zum Risiko für alle anderen Termine des Tages.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {serviceZones.map((zone) => (
                <li key={zone.id} className="flex items-start justify-between gap-6 py-4">
                  <div>
                    <p className="font-semibold">{zone.label}</p>
                    <p className="t-small mt-1 text-mute">{zone.note}</p>
                  </div>
                  <p className="t-small shrink-0 pt-0.5 text-right text-ink-soft">{zone.surcharge}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Schluss */}
      <section className="section text-center">
        <div className="container-page">
          <LogoMark className="mx-auto h-14 w-14" />
          <h2 className="t-headline mx-auto mt-6 max-w-[760px] text-balance" data-reveal>
            {company.claim}
          </h2>
          <p className="t-intro mx-auto mt-5 max-w-[600px] text-pretty text-mute" data-reveal style={delay(80)}>
            Das Aufmaß vor Ort ist im Einsatzgebiet kostenfrei. Danach bekommen Sie ein
            Festpreisangebot über alle beteiligten Gewerke.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" data-reveal style={delay(160)}>
            <Link href="/termin" className="btn-primary">
              Termin anfragen
            </Link>
            <a href={`tel:${company.phoneHref}`} className="btn-secondary">
              <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} />
              {company.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
