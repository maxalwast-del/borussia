'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { projectCategories, projects } from '@/content/projects';
import { ProjectCard } from '@/components/project-card';

const OPTIONS = ['Alle', ...projectCategories];

/**
 * Referenzen mit Filter als Segmentsteuerung: Der weiße Schieber gleitet
 * zur gewählten Kategorie, statt dass nur die Farbe umspringt. Eine
 * CSS-Transition startet beim Umentscheiden mitten in der Bewegung vom
 * aktuellen Punkt aus, der Schieber springt also nie.
 */
export function ProjectGallery() {
  const [filter, setFilter] = useState<string>('Alle');
  const track = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{ x: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const node = track.current;
    if (!node) return;
    const place = () => {
      const active = node.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (active) setThumb({ x: active.offsetLeft, width: active.offsetWidth });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(node);
    return () => ro.disconnect();
  }, [filter]);

  const visible = filter === 'Alle' ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div
          ref={track}
          role="group"
          aria-label="Projekte nach Gewerk filtern"
          className="relative mx-auto flex w-max rounded-full bg-fill p-[3px]"
        >
          {thumb && (
            <span
              aria-hidden="true"
              className="absolute bottom-[3px] left-0 top-[3px] rounded-full bg-thumb shadow-[0_3px_8px_rgba(0,0,0,0.12),0_3px_1px_rgba(0,0,0,0.04)] transition-[transform,width] duration-[400ms] ease-apple motion-reduce:transition-none"
              style={{ transform: `translateX(${thumb.x}px)`, width: thumb.width }}
            />
          )}
          {OPTIONS.map((option) => {
            const active = filter === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={active}
                className={`relative z-10 h-9 whitespace-nowrap rounded-full px-4 text-[0.875rem] tracking-[-0.005em] transition-colors duration-200 ${
                  active ? 'font-medium text-ink' : 'text-ink-soft hover:text-ink'
                } ${active && !thumb ? 'bg-thumb' : ''}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'Projekt' : 'Projekte'} angezeigt
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <li key={`${filter}-${project.slug}`} className="fade-in" style={{ animationDelay: `${index * 40}ms` }}>
            <ProjectCard project={project} index={projects.indexOf(project)} headingLevel="h2" />
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="t-body mt-10 text-center text-mute">In dieser Kategorie ist noch kein Projekt eingepflegt.</p>
      )}
    </>
  );
}
