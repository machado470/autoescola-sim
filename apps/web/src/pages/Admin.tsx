import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, getToken, getUser } from "../lib/auth";

export default function Admin() {
  const navigate = useNavigate();
  const user = getUser();
  const token = getToken();

  useEffect(() => {
    if (!token || !user) {
      navigate("/auth/login");
    }
  }, [navigate, token, user]);

  if (!token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p className="text-sm text-slate-400">
          Redirecionando para login...
        </p>
      </div>
    );
  }

  function handleLogout() {
    clearAuth();
    navigate("/auth/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Painel{" "}
              <span className="text-emerald-400">AutoEscola Sim</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Bem-vindo,{" "}
              <span className="font-medium text-slate-100">
                {user.name ?? "Admin AutoEscola"}
              </span>{" "}
              (<span className="font-mono text-emerald-300">
                {user.email}
              </span>
              )
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-600 hover:border-red-400 hover:text-red-300 transition"
          >
            Sair
          </button>
        </header>

        <main className="grid md:grid-cols-[2fr,3fr] gap-6">
          <section className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Usuário autenticado
            </h2>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-slate-400">ID:</span>{" "}
                <span className="font-mono text-emerald-300">
                  {user.id}
                </span>
              </p>
              <p>
                <span className="text-slate-400">E-mail:</span>{" "}
                <span className="font-mono text-emerald-300">
                  {user.email}
                </span>
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Próximos módulos do painel
            </h2>
            <ul className="text-sm space-y-2 text-slate-300 list-disc list-inside">
              <li>
                <b>Aulas (Lessons)</b> – cadastro de aulas teóricas e
                conteúdos por tema
              </li>
              <li>
                <b>Questões (Questions)</b> – banco de questões por
                categoria DETRAN
              </li>
              <li>
                <b>Simulados (Quiz)</b> – geração de simulados estilo
                prova oficial
              </li>
            </ul>
          </section>
        </main>

        <section className="rounded-2xl bg-slate-900/80 border border-emerald-500/30 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
            Token JWT (preview)
          </h2>
          <p className="text-xs text-slate-400">
            Use esse token nas chamadas autenticadas da API local durante o
            desenvolvimento.
          </p>
          <div className="mt-2 rounded-xl bg-slate-950/80 border border-emerald-500/20 px-3 py-3">
            <p className="text-[11px] font-mono text-emerald-200 break-all">
              {token}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
