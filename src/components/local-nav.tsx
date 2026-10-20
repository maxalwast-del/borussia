'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/**
 * Lokale Navigation der Unterseiten: Seitentitel links, Terminknopf rechts.
 * Sie bleibt beim Scrollen oben stehen und bekommt erst dann eine feine
 * Kante, wenn Inhalt unter ihr durchläuft.
 */
export function LocalNav({
  title,
  href,
  links,
  cta = true,
}: {
  title: string;
  href: string;
  links?: { href: string; label: string }[];
  cta?: boolean;
}) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), { threshold: 0 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-px" />
      <div
        className={`material sticky top-0 z-40 -mt-px transition-shadow duration-300 ${
          stuck ? 'shadow-[inset_0_-1px_0_rgb(var(--c-line))]' : 'shadow-[inset_0_-1px_0_rgb(var(--c-line)/0.6)]'
        }`}
      >
        <div className="container-page flex h-[52px] items-center justify-between gap-6">
          <Link href={href} className="truncate text-[1.1875rem] font-semibold tracking-[-0.005em] text-ink sm:text-[1.3125rem]">
            {title}
          </Link>
          <div className="flex shrink-0 items-center gap-6">
            {links && (
              <ul className="hidden items-center gap-6 lg:flex">
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-[0.8125rem] text-ink/75 transition-colors hover:text-accent">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <Link href="/termin" className="btn-primary btn-sm">
                Termin anfragen
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
