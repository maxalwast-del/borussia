import Link from 'next/link';
import { company, serviceZones } from '@/config/site';
import { SloganRule } from '@/components/logo';

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy text-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-wordmark text-3xl uppercase leading-none tracking-[0.01em]">Borussia</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            Baudienstleistungen
          </p>
          <div className="mt-5"><SloganRule tone="dark" /></div>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-paper/65">{company.tagline}</p>
          <p className="mt-4 font-display text-lg italic text-paper/85">{company.claim}</p>
          <div className="mt-6 space-y-1 text-[15px] text-paper/80">
            <p>{company.street}</p>
            <p>
              {company.zip} {company.city}
            </p>
            <p className="pt-3">
              <a href={`tel:${company.phoneHref}`} className="hover:text-brand">
                {company.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-brand">
                {company.email}
              </a>
            </p>
            <p className="pt-3 text-paper/65">{company.chamber}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">Seiten</p>
          <ul className="mt-4 space-y-2.5 text-[15px] text-paper/80">
            {[
              ['/leistungen', 'Leistungen'],
              ['/referenzen', 'Referenzen'],
              ['/ablauf', 'Ablauf'],
              ['/termin', 'Termin anfragen'],
              ['/jobs', 'Jobs'],
              ['/kontakt', 'Kontakt'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-brand">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">Einsatzgebiet</p>
          <ul className="mt-4 space-y-2.5 text-[15px] text-paper/80">
            {serviceZones.map((zone) => (
              <li key={zone.id}>{zone.label}</li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">Öffnungszeiten</p>
          <ul className="mt-4 space-y-1.5 text-[15px] text-paper/80">
            {company.openingHours.map((entry) => (
              <li key={entry.days}>
                <span className="inline-block w-20 text-paper/55">{entry.days}</span>
                {entry.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-paper">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-paper">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
