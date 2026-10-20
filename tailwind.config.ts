import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Neutrale Grautöne nach dem Vorbild von apple.com. Sie tragen die
        // Seite; Farbe kommt nur über den Akzent und die Illustrationen.
        ink: {
          DEFAULT: '#1D1D1F',
          soft: '#424245',
        },
        // 5,07:1 auf Weiß, 4,66:1 auf canvas. Darunter nicht für Text verwenden.
        mute: '#6E6E73',
        // Nur für Rahmen von Bedienelementen (3,6:1 auf Weiß), nie für Text.
        faint: '#86868B',
        line: '#D2D2D7',
        canvas: '#F5F5F7',
        fill: '#E8E8ED',
        // Der Akzent liegt im Farbton des Logoblaus, ist aber satter.
        // Weiße Schrift darauf und blaue Schrift auf Weiß erreichen je 5,2:1.
        accent: {
          DEFAULT: '#0A6CCF',
          hover: '#1677D2',
          // Das helle Logoblau. Auf Schwarz 7,0:1, auf Weiß nur 2,9:1,
          // deshalb nur auf dunklem Grund für Text.
          bright: '#2E9BE8',
          soft: '#E8F1FB',
        },
        night: {
          DEFAULT: '#000000',
          tile: '#1D1D1F',
          text: '#F5F5F7',
          mute: '#A1A1A6',
        },
        danger: {
          DEFAULT: '#D70015',
          soft: '#FFF2F4',
        },
        // Marineblau der Wortmarke. Nur für das Logo.
        navy: '#122C5E',
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
