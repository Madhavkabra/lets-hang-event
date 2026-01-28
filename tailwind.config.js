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
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Custom typography tokens
        'header-brand': ['32px', { lineHeight: '100%', letterSpacing: '-0.29px', fontWeight: '700' }],
        'event-title': ['48px', { lineHeight: '100%', letterSpacing: '0%', fontWeight: '600' }],
        'title-1': ['20px', { lineHeight: '100%', letterSpacing: '0%', fontWeight: '600' }],
        'title-2': ['16px', { lineHeight: '100%', letterSpacing: '0%', fontWeight: '600' }],
        'title-2-medium': ['16px', { lineHeight: '100%', letterSpacing: '0%', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '100%', letterSpacing: '0%', fontWeight: '500' }],
        'callout': ['14px', { lineHeight: '100%', letterSpacing: '0%', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '100%', letterSpacing: '0%', fontWeight: '500' }],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

