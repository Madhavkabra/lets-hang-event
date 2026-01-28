/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-violet': '#2e1065',
        'soft-pink': '#ec4899',
        'dark-purple': '#1e1b4b',
        'glass-dark': 'rgba(0, 0, 0, 0.2)',
        'glass-light': 'rgba(255, 255, 255, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

