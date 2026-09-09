import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Anthrazit mit leichtem Blaustich – trägt allen Fließtext.
        ink: {
          DEFAULT: '#17212B',
          soft: '#2C3A47',
          muted: '#5C6B7A',
        },
        // Kühles Grau als Seitenhintergrund, Karten stehen in Weiß darauf.
        gypsum: {
          DEFAULT: '#F3F6F9',
          deep: '#E4EAF0',
        },
        // Hellblau. Der DEFAULT ist dunkel genug für Text auf Weiß
        // (Kontrast 5,3:1, erfüllt WCAG AA); `bright` ist rein dekorativ.
        accent: {
          DEFAULT: '#1F6FB2',
          hover: '#17588F',
          soft: '#DCEAF6',
          bright: '#4A9BD8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
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
