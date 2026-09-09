import Link from 'next/link';
import { company, serviceZones } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-gypsum">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl tracking-tight">{company.name}</p>
          <p className="mt-2 text-sm font-medium tracking-wide text-accent-bright">{company.slogan}</p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-gypsum/65">{company.tagline}</p>
          <div className="mt-6 space-y-1 text-[15px] text-gypsum/80">
            <p>{company.street}</p>
            <p>
              {company.zip} {company.city}
            </p>
            <p className="pt-3">
              <a href={`tel:${company.phoneHref}`} className="hover:text-accent">
                {company.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-accent">
                {company.email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gypsum/45">Seiten</p>
          <ul className="mt-4 space-y-2.5 text-[15px] text-gypsum/80">
            {[
              ['/leistungen', 'Leistungen'],
              ['/referenzen', 'Referenzen'],
              ['/ablauf', 'Ablauf'],
              ['/termin', 'Termin anfragen'],
              ['/jobs', 'Jobs'],
              ['/kontakt', 'Kontakt'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gypsum/45">Einsatzgebiet</p>
          <ul className="mt-4 space-y-2.5 text-[15px] text-gypsum/80">
            {serviceZones.map((zone) => (
              <li key={zone.id}>{zone.label}</li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gypsum/45">Öffnungszeiten</p>
          <ul className="mt-4 space-y-1.5 text-[15px] text-gypsum/80">
            {company.openingHours.map((entry) => (
              <li key={entry.days}>
                <span className="inline-block w-20 text-gypsum/55">{entry.days}</span>
                {entry.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-gypsum/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-gypsum">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-gypsum">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
