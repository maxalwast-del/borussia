import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categoryTrade, projects } from '@/content/projects';
import { Artwork, toneFor } from '@/components/artwork';
import { Icon } from '@/components/icon';
import { LocalNav } from '@/components/local-nav';
import { ProjectCard } from '@/components/project-card';
import { delay } from '@/components/ui';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return { title: 'Projekt nicht gefunden' };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const others = projects.filter((entry) => entry.slug !== slug).slice(0, 3);
  const specs = [
    { label: 'Fläche', value: project.area },
    { label: 'Bauzeit', value: project.duration },
    { label: 'Fertiggestellt', value: String(project.year) },
    { label: 'Ort', value: project.location },
  ];

  return (
    <article>
      <LocalNav title="Referenzen" href="/referenzen" />

      <header className="container-page pb-12 pt-10 sm:pt-14">
        <Link href="/referenzen" className="link inline-flex items-center gap-0.5 t-small">
          <Icon name="chevron-left" className="h-3 w-3" strokeWidth={2.6} />
          Alle Referenzen
        </Link>
        <p className="t-eyebrow mt-8 text-accent" data-reveal>
          {project.category}
        </p>
        <h1 className="t-headline mt-3 max-w-[860px] text-balance" data-reveal style={delay(60)}>
          {project.title}
        </h1>
        <p className="t-intro mt-5 max-w-[692px] text-pretty text-mute" data-reveal style={delay(120)}>
          {project.summary}
        </p>
      </header>

      <div className="container-wide" data-reveal style={delay(180)}>
        <Artwork
          trade={categoryTrade[project.category]}
          tone={toneFor(index)}
          label={`Symbolgrafik ${project.category}`}
          className="tile aspect-[4/3] sm:aspect-[2/1]"
          glyphClassName="w-[22%] max-w-[180px]"
        />
      </div>

      {/* Eckdaten im Stil technischer Daten */}
      <section aria-label="Eckdaten" className="container-page">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-line py-14 md:grid-cols-4">
          {specs.map((spec) => (
            <div key={spec.label} data-reveal>
              <dt className="t-small font-semibold text-mute">{spec.label}</dt>
              <dd className="mt-1 text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.008em] sm:text-[2rem]">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="container-text space-y-14 py-16 sm:py-20">
        <Block title="Die Herausforderung" text={project.challenge} />
        <Block title="Unsere Lösung" text={project.solution} />
        <Block title="Ergebnis" text={project.result} />
      </div>

      {project.testimonial && (
        <section className="bg-canvas py-20 sm:py-24">
          <figure className="container-text text-center" data-reveal>
            <blockquote className="text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.008em] text-balance sm:text-[2.25rem]">
              „{project.testimonial.quote}“
            </blockquote>
            <figcaption className="t-body mt-6 text-mute">{project.testimonial.author}</figcaption>
          </figure>
        </section>
      )}

      <section className="container-page py-16 sm:py-20">
        <div className="tile grid gap-10 bg-canvas p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-end" data-reveal>
          <div>
            <h2 className="t-title">Ausgeführte Arbeiten</h2>
            <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {project.scope.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check" className="mt-[3px] h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="t-small text-mute">Ähnliches geplant?</p>
            <Link href="/termin" className="btn-primary">
              Termin anfragen
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-16 sm:py-20">
        <div className="container-page">
          <h2 className="t-title" data-reveal>
            Weitere Projekte
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug} data-reveal>
                <ProjectCard project={other} index={projects.indexOf(other)} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <section data-reveal>
      <h2 className="t-title">{title}</h2>
      <p className="t-intro mt-4 text-ink-soft">{text}</p>
    </section>
  );
}
