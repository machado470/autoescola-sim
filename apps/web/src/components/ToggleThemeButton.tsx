import useTheme from "../hooks/useTheme";

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-[#222] text-gray-700 dark:text-gray-200 text-sm"
    >
      {theme === "light" ? "🌙" : "🌞"}
    </button>
  );
}
