import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const nav = useNavigate();
  const path = useLocation().pathname;

  const btn = (label: string, route: string) => (
    <button
      onClick={() => nav(route)}
      className={`flex-1 py-3 text-sm ${
        path === route ? "text-blue-600 font-semibold" : "text-gray-500"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-xl flex border-t dark:border-gray-700">
      {btn("Home", "/aluno/home")}
      {btn("Dashboard", "/aluno/dashboard")}
      {btn("Simulado", "/aluno/simulado")}
    </div>
  );
}
