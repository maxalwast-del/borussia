import type { Metadata } from 'next';
import './globals.css';
import { company, siteUrl } from '@/config/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name}: ${company.slogan}`,
    template: `%s · ${company.name}`,
  },
  description:
    'Trockenbau und Innenausbau für Altbausanierung und Wohnungsumbau in Berlin und Brandenburg. Trennwände, abgehängte Decken, Dachausbau, Vorsatzschalen. Termin online anfragen.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: company.name,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: company.legalName,
    description: company.tagline,
    telephone: company.phone,
    email: company.email,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.street,
      postalCode: company.zip,
      addressLocality: company.city,
      addressCountry: company.country,
    },
    areaServed: ['Berlin', 'Brandenburg', 'Potsdam'],
    priceRange: '€€',
  };

  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap"
        />
      </head>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-gypsum"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="inhalt">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </body>
    </html>
  );
}
