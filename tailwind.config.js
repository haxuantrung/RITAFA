/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // ===== Brand: RITAFA Swiss-Tech Minimalism =====
        // Background & Surface — warm-toned dark instead of flat black
        ink: {
          0: '#FAFAFA',       // light mode bg
          50: '#F4F4F2',      // light mode surface alt
          100: '#E8E8E5',
          200: '#C7C7C2',
          300: '#9C9C97',
          400: '#6F6F6B',
          500: '#4A4A47',
          600: '#2E2E2C',     // dark surface elevated
          700: '#1F1F1E',     // dark surface
          800: '#141413',     // dark surface alt
          900: '#0A0A09',     // dark bg (warm-tinted near-black)
          950: '#050504',
        },
        // Amber — primary CTA, glow accents
        amber: {
          50: '#FBF7E8',
          100: '#F5EBC3',
          200: '#EFDE9C',
          300: '#E8D072',
          400: '#DDC156',
          500: '#D4AF37',     // primary
          600: '#B8932A',
          700: '#947421',
          800: '#705719',
          900: '#4D3C11',
        },
        // Element colors — periodic table accents
        element: {
          base: '#9CA3AF',     // [Ba] Gray — Everyday core
          scholar: '#60A5FA',  // [Sc] Blue — Academic
          kinetic: '#F87171',  // [Ki] Red — Performance
          home: '#4ADE80',     // [Hm] Green — Recovery
        },
        // System states
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'Univers Next', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'Univers Next', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Swiss type-scale 1.25
        'caption': ['0.8rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'h3': ['1.953rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['3.052rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['3.815rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display': ['4.768rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-xl': ['6.5rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '120': '30rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 24px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 48px rgba(212, 175, 55, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grid-light': 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        'grid-dark': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'amber-glow': 'radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
      },
      backgroundSize: {
        'grid': '32px 32px',
        'shimmer': '200% 100%',
      },
      boxShadow: {
        'amber-glow': '0 0 32px rgba(212, 175, 55, 0.25)',
        'card-light': '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
