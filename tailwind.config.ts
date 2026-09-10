import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Marineblau aus der Wortmarke. Trägt Fließtext und dunkle Flächen.
        navy: {
          DEFAULT: '#122C5E',
          deep: '#0B1D40',
          soft: '#2C4478',
          muted: '#5C6B87',
        },
        // Das helle Blau des Logos. Der DEFAULT ist so weit abgedunkelt,
        // dass weiße Schrift darauf 5,0:1 erreicht und blaue Schrift auf
        // Weiß denselben Wert. Beides erfüllt WCAG AA.
        brand: {
          DEFAULT: '#1A72BC',
          hover: '#145C99',
          bright: '#2E9BE8',
          soft: '#DCEBF8',
        },
        // Kühles Papierweiß, angelehnt an den Untergrund des Firmenschilds.
        paper: {
          DEFAULT: '#F4F7FA',
          deep: '#E3EBF3',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        wordmark: ['var(--font-wordmark)', 'Impact', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,33,43,0.04), 0 8px 28px -12px rgba(23,33,43,0.16)',
        lift: '0 2px 4px rgba(23,33,43,0.05), 0 18px 44px -16px rgba(31,111,178,0.22)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
};
export default config;
