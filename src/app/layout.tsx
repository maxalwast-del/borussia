import type { Metadata, Viewport } from 'next';
import { Archivo_Black, Inter } from 'next/font/google';
import './globals.css';
import { company, siteUrl } from '@/config/site';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ArtDefs } from '@/components/artwork';
import { RevealObserver } from '@/components/reveal';

// Auf Apple-Geräten greift die Systemschrift (SF Pro) zuerst. Inter ist die
// Rückfalllage für alle anderen Systeme, mit optischer Größenanpassung für
// große Überschriften. next/font liefert beide Schriften vom eigenen Server
// aus, der Browser baut keine Verbindung zu Google auf.
const inter = Inter({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-inter',
});

const wordmark = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-wordmark',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name}: ${company.slogan}`,
    template: `%s · ${company.name}`,
  },
  description:
    'Trockenbau, Fliesen, Maler, Innenausbau, Sanierung und Boden in Berlin und Brandenburg. Sechs Gewerke aus einer Hand, Termin online anfragen.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: company.name,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#fbfbfd',
};

// Setzt den Ausgangszustand für das Einblenden beim Scrollen, bevor die
// Seite gezeichnet wird. Meldet sich der Beobachter nicht innerhalb von vier
// Sekunden, wird alles sichtbar geschaltet, damit nichts unsichtbar hängen
// bleibt.
const revealBootstrap = `(function(){var d=document.documentElement;if(!('IntersectionObserver' in window))return;d.classList.add('js-reveal');setTimeout(function(){if(!window.__revealReady){d.classList.remove('js-reveal');}},4000);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    slogan: company.claim,
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
    <html lang="de" className={`${inter.variable} ${wordmark.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <ArtDefs />
        <SiteHeader />
        <main id="inhalt">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </body>
    </html>
  );
}
