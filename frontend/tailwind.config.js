/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fondo navy/morado tomado de la identidad de KAPO
        brand: {
          900: '#0B0730',
          800: '#120C3E',
          700: '#1B1257',
          600: '#2A1B6E',
          500: '#3A2786',
        },
        // Acento violeta — la energía del "guiño" de la marca
        accent: {
          100: '#ECE6FF',
          200: '#D6C9FF',
          400: '#8669FF',
          500: '#6C4CF1',
          600: '#5A3AD9',
          700: '#4A2EB8',
        },
        ink: {
          900: '#120D3E',
          700: '#332C5C',
          500: '#4B4570',
          300: '#8A84A8',
        },
        line: {
          100: '#ECE9F7',
          200: '#DFDAF0',
        },
        surface: {
          app: '#F6F4FC',
          card: '#FFFFFF',
        },
        success: '#1FAA73',
        danger: '#E5484D',
        warning: '#C9871F',
      },
      fontFamily: {
        display: ['var(--font-baloo)', 'ui-rounded', 'sans-serif'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(18, 13, 62, 0.04), 0 8px 24px -8px rgba(18, 13, 62, 0.10)',
        floating: '0 20px 60px -15px rgba(11, 7, 48, 0.45)',
        glow: '0 0 0 4px rgba(108, 76, 241, 0.16)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        wink: {
          '0%, 90%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '93%': { transform: 'rotate(-8deg) scale(0.95)' },
          '96%': { transform: 'rotate(2deg) scale(1.02)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-2%, 3%) scale(1.05)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        wink: 'wink 6s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        floatUp: 'floatUp 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
