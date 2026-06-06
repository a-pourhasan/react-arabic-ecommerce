/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Noto Kufi Arabic"', '"Cairo"', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c9a96e',
          light: '#e8d5b0',
          dark: '#a07840',
        },
        dark: {
          bg: '#0a0a0f',
          card: '#111118',
          sidebar: '#080810',
          input: '#0d0d16',
        },
      },
    },
  },
  plugins: [],
}
