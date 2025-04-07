/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#008374',
          light: '#66fdee',
          dark: '#006056',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
} 