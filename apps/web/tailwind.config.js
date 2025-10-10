/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'text-base': 'var(--text-base)',
        'card-bg': 'var(--card-bg)',
        accent: 'var(--accent)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.45s ease-out both',
      },
      boxShadow: {
        soft: '0 16px 32px -24px rgba(15, 23, 42, 0.45)',
      },
    },
  },
  plugins: [],
}
