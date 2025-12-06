import { Outlet } from "react-router-dom";
import BottomNav from "../components/ui/BottomNav";
import { useThemeStore } from "../store/theme";

export default function AppLayout() {
  const { theme } = useThemeStore();

  return (
    <div className={theme === "dark" ? "bg-[#111418] text-gray-100" : "bg-[#F7F9FC] text-gray-900"}>
      <header className="p-4 flex items-center gap-3">
        <img src="/logo-cone.png" className="w-8 h-8" />
        <h1 className="text-xl font-bold">AutoEscola-Sim</h1>
      </header>
      <main className="p-4 pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
