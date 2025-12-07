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
          DEFAULT: '#3D3D3D',   // Dark gray
          light: '#5A5A5A',     // Medium gray
          dark: '#1A1A1A',      // Almost black
        },
        secondary: {
          DEFAULT: '#808080',   // Medium-light gray
          light: '#9E9E9E',     // Light gray
          dark: '#5A5A5A',      // Medium gray
        },
        gray: {
          50: '#f9fafb',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#9E9E9E',
          500: '#808080',
          600: '#5A5A5A',
          700: '#3D3D3D',
          800: '#2A2A2A',
          900: '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
} 