import { useNavigate, NavLink } from "react-router-dom";

type AuthUser = {
  id: number;
  email: string;
  name?: string | null;
};

function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("autoescola_user");
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    localStorage.removeItem("autoescola_token");
    localStorage.removeItem("autoescola_user");
    navigate("/login");
  }

  const menuItems = [
    { label: "Visão geral", to: "/" },
    { label: "Simulados", to: "/simulados" },
    { label: "Questões", to: "/questoes" },
    { label: "Alunos", to: "/alunos" },
    { label: "Relatórios", to: "/relatorios" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="px-5 py-4 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight">
            AutoEscola <span className="text-emerald-400">Sim</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Painel de controle</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "block px-3 py-2 rounded-lg transition",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-300 font-medium"
                    : "text-slate-200 hover:bg-slate-800/70",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="mb-2">
            <p className="font-medium text-slate-200 text-sm">
              {user?.name || "Administrador"}
            </p>
            <p className="truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full rounded-lg border border-slate-600 px-3 py-1.5 text-xs hover:bg-slate-800"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-4">
        <header className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Visão geral
            </h2>
            <p className="text-sm text-slate-400">
              Resumo rápido do desempenho da autoescola.
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase mb-1">
              Simulados hoje
            </p>
            <p className="text-3xl font-bold text-emerald-400">0</p>
            <p className="text-xs text-slate-500 mt-1">
              Depois ligamos isso na API.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase mb-1">
              Alunos ativos
            </p>
            <p className="text-3xl font-bold text-sky-400">0</p>
            <p className="text-xs text-slate-500 mt-1">
              Dados virão do módulo de alunos.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase mb-1">
              Taxa de acerto média
            </p>
            <p className="text-3xl font-bold text-amber-400">0%</p>
            <p className="text-xs text-slate-500 mt-1">
              Vai ser calculada pelos resultados dos simulados.
            </p>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 mt-2">
          <h3 className="text-sm font-semibold mb-2">
            Próximos passos do painel
          </h3>
          <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
            <li>Conectar cards aos endpoints reais (simulados, alunos, etc.).</li>
            <li>Criar tela de gerenciamento de simulados.</li>
            <li>Criar tela de alunos e progresso.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
