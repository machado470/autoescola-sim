import { useNavigate } from "react-router-dom";
import { clearAuth, getToken, getUser } from "../lib/auth";

export function AdminDashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const token = getToken();

  const handleLogout = () => {
    clearAuth();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Painel AutoEscola Sim
            </h1>
            <p className="text-xs md:text-sm text-slate-400">
              Bem-vindo, {user?.name || "Admin"} ({user?.email})
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-xs md:text-sm font-medium"
          >
            Sair
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4">
            <p className="text-xs text-slate-400 mb-1">Usuário</p>
            <p className="text-sm md:text-base font-medium break-all">
              {user?.email}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              ID: {user?.id ?? "—"}
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4">
            <p className="text-xs text-slate-400 mb-1">Próximos módulos</p>
            <ul className="text-xs md:text-sm text-slate-300 space-y-1 mt-1">
              <li>• Aulas (Lessons)</li>
              <li>• Questões (Questions)</li>
              <li>• Simulados (Quiz)</li>
            </ul>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4">
            <p className="text-xs text-slate-400 mb-1">Token (preview)</p>
            <p className="text-[10px] md:text-xs break-all text-slate-400">
              {token ? token.slice(0, 80) + "..." : "Nenhum token salvo."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
