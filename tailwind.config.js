/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#fdfbf7',
          100: '#f5f0e6',
          200: '#e8dcc8',
          300: '#d4c4a8',
          400: '#c9a86c',
          500: '#a67c52',
          600: '#8b6914',
          700: '#6b5a3a',
          800: '#5a4a2f',
          900: '#4a3d26',
        }
      }
    },
  },
  plugins: [],
}

