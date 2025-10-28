import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setIsDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="text-sm border rounded-xl px-3 py-1 hover:bg-accent/10"
      title="Alternar tema"
    >
      {isDark ? "🌙 Escuro" : "☀️ Claro"}
    </button>
  );
}
