import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ensures our toggle works
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0f172a',
        'brand-blue': '#6CB4EE',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'ui-monospace', 'monospace'],
        silkscreen: ['"Silkscreen"', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [typography],
}
