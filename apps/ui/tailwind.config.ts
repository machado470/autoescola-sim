import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0f1117',
        foreground: '#f4f7fb',
        primary: '#00e0a8',
        muted: '#1a1d29',
        border: '#1f2330'
      },
      boxShadow: {
        card: '0 20px 45px -20px rgba(0, 224, 168, 0.25)'
      }
    }
  },
  plugins: []
}

export default config
