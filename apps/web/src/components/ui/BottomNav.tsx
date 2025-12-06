import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../../store/theme";

export default function BottomNav() {
  const { pathname } = useLocation();
  const { theme } = useThemeStore();

  const active = (path: string) =>
    pathname === path ? "opacity-100 scale-110" : "opacity-50";

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 h-16 flex justify-around items-center
        backdrop-blur-md border-t
        ${theme === "dark"
          ? "bg-[#1A1D21]/80 border-gray-700"
          : "bg-white/80 border-gray-300"}
      `}
    >
      <Link to="/aluno">
        <img src="/nav-home.png" className={`w-7 ${active("/aluno")}`} />
      </Link>

      <Link to="/aluno/simulado">
        <img src="/nav-search.png" className={`w-7 ${active("/aluno/simulado")}`} />
      </Link>

      <Link to="/aluno/perfil">
        <img src="/nav-user.png" className={`w-7 ${active("/aluno/perfil")}`} />
      </Link>
    </nav>
  );
}
