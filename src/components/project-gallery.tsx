'use client';

import Link from 'next/link';
import { useState } from 'react';
import { projectCategories, projects } from '@/content/projects';
import { Visual } from '@/components/visual';

export function ProjectGallery() {
  const [filter, setFilter] = useState<string>('Alle');
  const visible = filter === 'Alle' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Projekte filtern">
        {['Alle', ...projectCategories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === category
                ? 'bg-navy text-paper'
                : 'border border-navy/15 bg-white text-navy-muted hover:border-navy/35 hover:text-navy'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <Link key={project.slug} href={`/referenzen/${project.slug}`} className="group">
            <Visual
              variant={index}
              label={project.title}
              className="aspect-[4/3] rounded-card transition duration-300 group-hover:shadow-lift"
            />
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
              {project.category} · {project.year}
            </p>
            <h2 className="heading-md mt-2 text-xl group-hover:text-brand">{project.title}</h2>
            <p className="prose-body mt-2">{project.summary}</p>
            <p className="mt-3 text-sm font-medium text-navy-muted">
              {project.location} · {project.area} · {project.duration}
            </p>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="prose-body mt-10">In dieser Kategorie ist noch kein Projekt eingepflegt.</p>
      )}
    </>
  );
}
