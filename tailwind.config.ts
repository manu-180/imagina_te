import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tintas
        ink: '#0E0B0A',
        noir: '#1A1A1A',
        'soft-black': '#2A2522',

        // Crema y nudes
        cream: '#F5EFE7',
        ivory: '#FAF6F0',
        linen: '#ECE4D9',
        bone: '#E8DFD2',

        // Acentos cálidos
        champagne: {
          DEFAULT: '#C9A96E',
          light: '#D4B98C',
        },
        rose: {
          DEFAULT: '#C99E9A',
          deep: '#B47A75',
        },
        blush: '#EAD5C8',
        burgundy: '#6B1F2E',

        // Grises funcionales
        'warm-gray': {
          100: '#E5DED1',
          300: '#BFB6A8',
          500: '#8A8175',
        },

        // Estados
        success: '#5A7A52',
        error: '#9B1B30',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        accent: ['var(--font-italiana)', 'serif'],
      },
      letterSpacing: {
        widest: '0.18em',
        eyebrow: '0.18em',
        button: '0.14em',
      },
      animation: {
        heartbeat: 'heartbeat 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 1.6s linear infinite',
        'bag-bounce': 'bagBounce 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
        'bloom-in': 'bloomIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.06)' },
          '30%': { transform: 'scale(1)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bagBounce: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.18)' },
          '100%': { transform: 'scale(1)' },
        },
        bloomIn: {
          '0%': { transform: 'scale(0.2)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
