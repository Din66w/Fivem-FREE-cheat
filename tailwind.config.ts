import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // NOX monochrome system — pure black / white + grays only.
        ink: {
          DEFAULT: '#000000', // page background
          900: '#050505', // raised surfaces / footer
          800: '#0c0c0c', // cards / image wells
          700: '#161616', // hover surfaces
          600: '#1f1f1f', // hairline borders
        },
        bone: {
          DEFAULT: '#ffffff', // primary text
          muted: '#b3b3b3', // secondary text
        },
        ash: '#6b6b6b', // tertiary / eyebrow text
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        brand: '0.35em',
      },
      maxWidth: {
        nox: '1440px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        shimmer: 'shimmer 1.6s infinite',
        kenburns: 'kenburns 20s ease-in-out infinite alternate',
      },
      transitionTimingFunction: {
        nox: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
