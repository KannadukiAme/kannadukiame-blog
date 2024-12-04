/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind')

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        common: [
          '"Chinese Quotes"',
          '"Inter var"',
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        sora: {
          50: '#f2f9fd',
          100: '#e4f1fa',
          200: '#c4e2f3',
          300: '#90cbe9',
          400: '#58b2dc',
          500: '#2f97c8',
          600: '#1f79aa',
          700: '#1b6189',
          800: '#1a5272',
          900: '#1b455f',
          950: '#122d3f',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), addDynamicIconSelectors()],
}
