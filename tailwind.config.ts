import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14161B',
          soft: '#232833',
          muted: '#5A6273',
        },
        gypsum: {
          DEFAULT: '#F6F4F1',
          deep: '#EBE7E1',
        },
        accent: {
          DEFAULT: '#C2703A',
          hover: '#A85C2C',
          soft: '#F5E4D6',
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
        card: '0 1px 2px rgba(20,22,27,0.04), 0 8px 28px -12px rgba(20,22,27,0.18)',
        lift: '0 2px 4px rgba(20,22,27,0.05), 0 18px 44px -16px rgba(20,22,27,0.28)',
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
