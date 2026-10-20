'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { company } from '@/config/site';
import { Wordmark } from '@/components/logo';
import { Icon } from '@/components/icon';

const links = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/referenzen', label: 'Referenzen' },
  { href: '/ablauf', label: 'Ablauf' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/termin', label: 'Termin' },
];

/**
 * Globale Navigation nach dem Muster von apple.com: flach, durchscheinend,
 * kleine Schrift, gleichmäßig über die Breite verteilt.
 *
 * Auf der Startseite bleibt sie oben stehen. Auf Unterseiten scrollt sie
 * weg, dort übernimmt die lokale Navigation mit Seitentitel und
 * Terminknopf (components/local-nav.tsx).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className={`${isHome ? 'sticky' : 'relative'} top-0 z-50`}>
      <div className={`relative z-10 transition-colors duration-300 ${open ? 'bg-white' : 'material'}`}>
        <nav className="container-page flex h-12 items-center justify-between gap-6" aria-label="Hauptnavigation">
          <Link href="/" aria-label={`${company.name}, Startseite`} className="-ml-1 flex h-11 items-center px-1">
            <Wordmark />
          </Link>

          <ul className="hidden flex-1 items-center justify-between md:flex md:max-w-[560px] lg:max-w-[640px]">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex h-11 items-center px-2 text-[0.8125rem] tracking-[-0.005em] transition-colors duration-200 ${
                      active ? 'text-ink' : 'text-ink/75 hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="-mr-2.5 flex items-center">
            <a
              href={`tel:${company.phoneHref}`}
              className="grid h-11 w-11 place-items-center text-ink/75 transition-colors hover:text-ink"
              aria-label={`Anrufen: ${company.phone}`}
            >
              <Icon name="phone" className="h-[17px] w-[17px]" strokeWidth={1.6} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative grid h-11 w-11 place-items-center text-ink/80 md:hidden"
            >
              <span className="sr-only">Menü {open ? 'schließen' : 'öffnen'}</span>
              <span aria-hidden="true" className="relative block h-4 w-[17px]">
                <span
                  className={`absolute left-0 top-1/2 block h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-apple ${
                    open ? 'rotate-45' : '-translate-y-[3.5px]'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-apple ${
                    open ? '-rotate-45' : 'translate-y-[3.5px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobiles Menü: klappt als ganze Fläche auf, die Einträge folgen nacheinander. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-12 overflow-y-auto bg-white transition-[opacity,visibility] duration-300 ease-apple md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobile Navigation" className="container-page pb-12 pt-4">
          <ul>
            {[{ href: '/', label: 'Start' }, ...links].map((link, index) => (
              <li
                key={link.href}
                className={`transition-[opacity,transform] duration-500 ease-apple motion-reduce:translate-y-0 ${
                  open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${60 + index * 28}ms` : '0ms' }}
              >
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className="block py-2 text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.008em] text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={`mt-10 flex flex-col gap-3 transition-opacity duration-500 ease-apple ${open ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: open ? '260ms' : '0ms' }}
          >
            <p className="t-caption font-semibold text-mute">Direkt erreichbar</p>
            <a href={`tel:${company.phoneHref}`} className="t-intro font-semibold text-ink">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="t-body link">
              {company.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
