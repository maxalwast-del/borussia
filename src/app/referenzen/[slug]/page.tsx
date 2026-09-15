import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { Visual } from '@/components/visual';

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

  return (
    <article>
      <div className="container-page pt-10">
        <Link href="/referenzen" className="text-sm font-medium text-navy-muted hover:text-navy">
          ← Alle Referenzen
        </Link>
      </div>

      <header className="container-page pt-8">
        <p className="eyebrow">
          {project.category} · {project.location} · {project.year}
        </p>
        <h1 className="heading-lg mt-4 max-w-3xl">{project.title}</h1>
        <p className="lede mt-5 max-w-2xl">{project.summary}</p>
      </header>

      <div className="container-page mt-10">
        <Visual variant={index} label={project.title} className="aspect-[16/8] rounded-card shadow-lift" />
      </div>

      <div className="container-page mt-12 grid gap-12 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-10">
          <Block title="Die Herausforderung" text={project.challenge} />
          <Block title="Unsere Lösung" text={project.solution} />
          <Block title="Ergebnis" text={project.result} />

          {project.testimonial && (
            <blockquote className="rounded-card border-l-4 border-brand bg-white p-7 shadow-card">
              <p className="font-display text-xl leading-relaxed">„{project.testimonial.quote}“</p>
              <footer className="mt-4 text-sm text-navy-muted">— {project.testimonial.author}</footer>
            </blockquote>
          )}
        </div>

        <aside className="card p-7 lg:sticky lg:top-24">
          <p className="eyebrow">Eckdaten</p>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ['Ort', project.location],
              ['Fläche', project.area],
              ['Bauzeit', project.duration],
              ['Jahr', String(project.year)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-navy/8 pb-3 last:border-0">
                <dt className="text-navy-muted">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-navy-muted">
            Ausgeführte Gewerke
          </p>
          <ul className="mt-3 space-y-2">
            {project.scope.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-navy-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <Link href="/termin" className="btn-brand mt-7 w-full">
            Ähnliches Projekt? Termin anfragen
          </Link>
        </aside>
      </div>

      <section className="container-page mt-24">
        <h2 className="heading-md">Weitere Projekte</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {others.map((other, otherIndex) => (
            <Link key={other.slug} href={`/referenzen/${other.slug}`} className="group">
              <Visual
                variant={otherIndex + 1}
                label={other.title}
                className="aspect-[4/3] rounded-card transition group-hover:shadow-lift"
              />
              <h3 className="heading-md mt-3 text-lg group-hover:text-brand">{other.title}</h3>
              <p className="prose-body mt-1.5 text-sm">{other.location}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h2 className="heading-md">{title}</h2>
      <p className="prose-body mt-3 text-base leading-relaxed">{text}</p>
    </section>
  );
}
