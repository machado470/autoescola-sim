/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#27e28a",   // verde ácido
        secondary: "#412277", // roxo mist
        accent: "#1e90ff",    // azul neon
      },
      borderRadius: { xl: "1rem" },
    },
  },
  plugins: [],
};
