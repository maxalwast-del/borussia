'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { company } from '@/config/site';
import { projects } from '@/content/projects';
import { LogoMark } from '@/components/logo';
import { Icon } from '@/components/icon';

const labels: Record<string, string> = {
  leistungen: 'Leistungen',
  referenzen: 'Referenzen',
  ablauf: 'Ablauf',
  termin: 'Termin anfragen',
  jobs: 'Jobs',
  kontakt: 'Kontakt',
  impressum: 'Impressum',
  datenschutz: 'Datenschutz',
};

/** Brotkrumen in der Fußzeile: beantwortet „Wo bin ich?" auch ganz unten. */
export function FooterBreadcrumb() {
  const pathname = usePathname();
  const [section, slug] = pathname.split('/').filter(Boolean);
  const crumbs: { href: string; label: string }[] = [];
  if (section && labels[section]) crumbs.push({ href: `/${section}`, label: labels[section] });
  if (section === 'referenzen' && slug) {
    const project = projects.find((entry) => entry.slug === slug);
    if (project) crumbs.push({ href: pathname, label: project.title });
  }

  return (
    <nav aria-label="Brotkrumen" className="py-4">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" aria-label={`${company.name}, Startseite`} className="flex items-center opacity-90 hover:opacity-100">
            <LogoMark className="h-4 w-4" />
          </Link>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <Icon name="chevron-right" className="h-2.5 w-2.5 text-faint" strokeWidth={2.4} />
            {index === crumbs.length - 1 ? (
              <span aria-current="page" className="text-ink-soft">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="text-ink-soft hover:underline">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
