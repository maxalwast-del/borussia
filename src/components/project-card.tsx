import Link from 'next/link';
import { categoryTrade, type Project } from '@/content/projects';
import { Artwork, toneFor } from '@/components/artwork';
import { Icon } from '@/components/icon';

export function ProjectCard({
  project,
  index,
  headingLevel = 'h3',
}: {
  project: Project;
  index: number;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/referenzen/${project.slug}`}
      className="card-link flex h-full flex-col overflow-hidden rounded-card bg-surface"
    >
      <Artwork
        trade={categoryTrade[project.category]}
        tone={toneFor(index)}
        className="aspect-[4/3]"
        glyphClassName="w-[24%]"
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="t-caption font-semibold text-mute">
          {project.category} · {project.location}
        </p>
        <Heading className="t-card mt-2 text-ink">{project.title}</Heading>
        <p className="t-small mt-2.5 line-clamp-3 text-mute">{project.summary}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="t-caption text-mute">
            {project.area} · {project.duration} · {project.year}
          </p>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-inset text-ink-soft" aria-hidden="true">
            <Icon name="chevron-right" className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </Link>
  );
}
