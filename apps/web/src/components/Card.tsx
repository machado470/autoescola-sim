import { useThemeStore } from "../store/theme";

export default function Card({ children, className }: any) {
  const { theme } = useThemeStore();

  return (
    <div
      className={`
        rounded-2xl border shadow-sm
        ${theme === "dark"
          ? "bg-[#1A1D21] border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
