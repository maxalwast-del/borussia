import Link from 'next/link';
import { company, serviceZones, trades } from '@/config/site';
import { FooterBreadcrumb } from '@/components/footer-breadcrumb';
import { Icon } from '@/components/icon';

type Column = {
  title: string;
  items: { label: string; href?: string }[];
};

const columns: Column[] = [
  {
    title: 'Leistungen',
    items: trades.map((trade) => ({ label: trade.label, href: `/leistungen#${trade.id}` })),
  },
  {
    title: 'Unternehmen',
    items: [
      { label: 'Referenzen', href: '/referenzen' },
      { label: 'Ablauf', href: '/ablauf' },
      { label: 'Jobs', href: '/jobs' },
    ],
  },
  {
    title: 'Kontakt',
    items: [
      { label: 'Termin anfragen', href: '/termin' },
      { label: 'Kontaktformular', href: '/kontakt' },
      { label: company.phone, href: `tel:${company.phoneHref}` },
      { label: company.email, href: `mailto:${company.email}` },
    ],
  },
  {
    title: 'Einsatzgebiet',
    items: serviceZones.map((zone) => ({ label: zone.label })),
  },
  {
    title: 'Bürozeiten',
    items: company.openingHours.map((entry) => ({ label: `${entry.days}: ${entry.time}` })),
  },
];

/**
 * Fußzeile nach dem Muster von apple.com: hellgrau, kleine Schrift,
 * Hinweise oben, Brotkrumen, Verzeichnis in Spalten. Auf dem Handy werden
 * die Spalten zu aufklappbaren Gruppen.
 */
export function SiteFooter() {
  return (
    <footer className="bg-canvas text-[0.75rem] leading-[1.33] text-mute">
      <div className="container-page pb-6 pt-5">
        <div className="space-y-2 border-b border-line pb-4">
          <p>
            Das Aufmaß vor Ort ist im Einsatzgebiet kostenfrei. Für die Anfahrt gilt:{' '}
            {serviceZones.map((zone) => `${zone.label} ${zone.surcharge}`).join(', ')}.
          </p>
          <p>
            Handwerkerleistungen in Privathaushalten sind nach § 35a EStG anteilig steuerlich
            begünstigt, Materialkosten zählen nicht dazu. Unsere Rechnungen weisen den Lohnanteil
            deshalb getrennt aus.
          </p>
        </div>

        <FooterBreadcrumb />

        {/* Verzeichnis ab Tablet: Spalten */}
        <nav aria-label="Verzeichnis" className="hidden grid-cols-5 gap-6 pt-1 md:grid">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-2.5 font-semibold text-ink">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    ) : (
                      <span className="text-ink-soft">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Verzeichnis auf dem Handy: aufklappbar */}
        <nav aria-label="Verzeichnis" className="md:hidden">
          {columns.map((column) => (
            <details key={column.title} className="faq group border-b border-line">
              <summary className="flex cursor-pointer items-center justify-between py-3 text-[0.875rem] text-ink">
                {column.title}
                <Icon
                  name="chevron-down"
                  className="h-3.5 w-3.5 text-mute transition-transform duration-300 group-open:rotate-180"
                  strokeWidth={2}
                />
              </summary>
              <ul className="space-y-3 pb-4 pl-3 text-[0.875rem]">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    ) : (
                      <span className="text-ink-soft">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>

        <p className="mt-8">
          Weitere Wege zu uns: Rufen Sie an unter{' '}
          <a href={`tel:${company.phoneHref}`} className="text-accent hover:underline">
            {company.phone}
          </a>{' '}
          oder schreiben Sie an{' '}
          <a href={`mailto:${company.email}`} className="text-accent hover:underline">
            {company.email}
          </a>
          .
        </p>

        <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-0">
            <p className="md:mr-7">
              Copyright © {new Date().getFullYear()} {company.legalName}. Alle Rechte vorbehalten.
            </p>
            <ul className="flex">
              {[
                ['/impressum', 'Impressum'],
                ['/datenschutz', 'Datenschutz'],
                ['/jobs', 'Karriere'],
              ].map(([href, label], index) => (
                <li key={href} className={index > 0 ? 'border-l border-line pl-2.5 ml-2.5' : ''}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-ink-soft">Berlin und Brandenburg</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className = 'text-ink-soft hover:underline';
  if (href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
