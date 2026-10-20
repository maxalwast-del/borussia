import type { Config } from 'tailwindcss';

/**
 * Farben laufen über CSS-Variablen (src/app/globals.css), damit dieselbe
 * Klasse im hellen und im dunklen Erscheinungsbild passt. Der Modus folgt
 * der Systemeinstellung, wie bei Apple.
 */
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Flächen, von hinten nach vorn. Hell sind mehrere davon gleich,
        // dunkel trennen sie sich, weil dort Tiefe über Helligkeit läuft.
        page: v('page'), // Seitengrund
        canvas: v('canvas'), // abgesetzte Abschnitte
        surface: v('surface'), // Karten auf abgesetzten Abschnitten, Felder
        well: v('well'), // Kacheln direkt auf dem Seitengrund
        inset: v('inset'), // Mulden innerhalb einer Karte
        chip: v('chip'), // kleine Bedienflächen auf Kacheln
        thumb: v('thumb'), // Schieber der Segmentsteuerung
        fill: v('fill'), // Spur der Segmentsteuerung
        ink: {
          DEFAULT: v('ink'),
          soft: v('ink-soft'),
        },
        // Hell 5,07:1 auf Weiß, dunkel 8,2:1 auf Schwarz.
        mute: v('mute'),
        // Nur für Rahmen von Bedienelementen, nie für Text.
        faint: v('faint'),
        line: v('line'),
        // Akzent für Text, Symbole und Rahmen. Hell das satte Blau,
        // dunkel das helle Logoblau, damit es auf Schwarz lesbar bleibt.
        accent: {
          DEFAULT: v('accent'),
          bright: '#2E9BE8',
        },
        // Gefüllte Schaltflächen mit weißer Schrift. Bleibt in beiden
        // Modi dunkel genug für 5,2:1.
        action: {
          DEFAULT: v('action'),
          hover: v('action-hover'),
        },
        night: {
          DEFAULT: '#000000',
          tile: '#1D1D1F',
          text: '#F5F5F7',
          mute: '#A1A1A6',
        },
        danger: {
          DEFAULT: v('danger'),
          soft: v('danger-soft'),
        },
        // Wortmarke: hell Marineblau, dunkel fast Weiß.
        logo: v('logo'),
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'var(--font-inter)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        wordmark: ['var(--font-wordmark)', 'Impact', 'sans-serif'],
      },
      maxWidth: {
        content: '1024px',
        wide: '1260px',
        text: '692px',
      },
      borderRadius: {
        tile: '28px',
        card: '18px',
        ctl: '12px',
      },
      boxShadow: {
        card: '2px 4px 12px rgba(0,0,0,0.08)',
        'card-hover': '2px 4px 16px rgba(0,0,0,0.16)',
        float: '0 10px 40px -10px rgba(0,0,0,0.25)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
        'apple-out': 'cubic-bezier(0, 0, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
