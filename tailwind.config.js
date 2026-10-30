/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f8fafc',
        'paper-card': '#ffffff',
        'paper-muted': '#f0f5fa',
        ink: '#091424',
        'ink-muted': '#475569',
        ocean: '#0b172c',
        'ocean-card': '#11223e',
        'ocean-light': '#182f54',
        'water-blue': '#2563eb',
        'water-blue-hover': '#1d4ed8',
        cyan: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        brand: '#0b172c',
        'brand-accent': '#38bdf8',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(11, 23, 44, 0.05), 0 0 0 1px rgba(11, 23, 44, 0.05)',
        'card-hover': '0 20px 35px -5px rgba(11, 23, 44, 0.1), 0 0 0 1px rgba(37, 99, 235, 0.15)',
        lift: '0 25px 50px -12px rgba(11, 23, 44, 0.28)',
        glow: '0 0 35px rgba(56, 189, 248, 0.35)',
        'glow-blue': '0 0 40px rgba(37, 99, 235, 0.25)',
      },
    },
  },
  plugins: [],
}