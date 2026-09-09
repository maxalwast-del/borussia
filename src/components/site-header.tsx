'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { company } from '@/config/site';

const links = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/referenzen', label: 'Referenzen' },
  { href: '/ablauf', label: 'Ablauf' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-ink/10 bg-gypsum/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${company.name} Startseite`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-gypsum">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
              <path d="M3 4h8v6H3V4Zm10 0h8v6h-8V4ZM3 12h5v8H3v-8Zm7 0h11v8H10v-8Z" />
            </svg>
          </span>
          <span className="whitespace-nowrap font-display text-base font-semibold leading-tight tracking-tight sm:text-lg">
            {company.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Hauptnavigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3.5 py-2 text-[15px] transition ${
                pathname.startsWith(link.href)
                  ? 'font-semibold text-ink'
                  : 'text-ink-muted hover:bg-white/70 hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a href={`tel:${company.phoneHref}`} className="whitespace-nowrap text-[15px] font-medium text-ink-muted hover:text-ink">
            {company.phone}
          </a>
          <Link href="/termin" className="btn-accent whitespace-nowrap px-5 py-2.5 text-sm">
            Termin anfragen
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="grid h-10 w-10 place-items-center rounded-lg border border-ink/15 bg-white/70 xl:hidden"
        >
          <span className="sr-only">Menü {open ? 'schließen' : 'öffnen'}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-ink/10 bg-gypsum xl:hidden">
          <nav className="container-page flex flex-col py-3" aria-label="Mobile Navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-2 py-3 text-base text-ink-soft">
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 pb-4">
              <Link href="/termin" className="btn-accent w-full">
                Termin anfragen
              </Link>
              <a href={`tel:${company.phoneHref}`} className="btn-ghost w-full">
                {company.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
