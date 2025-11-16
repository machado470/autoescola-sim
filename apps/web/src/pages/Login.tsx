import { useState, type FormEvent } from "react";
import api from "../lib/api";
import { saveAuth } from "../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("admin@autoescola.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login", { email, password });
      const token: string = res.data.access_token;
      const user = { id: 1, email };
      saveAuth(token, user);
      window.location.href = "/";
    } catch (err: unknown) {
      setError("Falha no login. Confirme e-mail e senha.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/90 rounded-2xl shadow-2xl shadow-slate-900/60 border border-slate-800 px-8 py-10">
        <h1 className="text-center text-3xl font-bold text-slate-50 mb-2">
          AutoEscola <span className="text-emerald-400">Sim</span>
        </h1>
        <p className="text-center text-slate-400 text-sm mb-8">
          Painel do administrador
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-200">
              E-mail
            </label>
            <input
              type="email"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-200">
              Senha
            </label>
            <input
              type="password"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-md px-2 py-1">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 h-10 rounded-lg bg-emerald-500 text-emerald-950 font-semibold text-sm hover:bg-emerald-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-[11px] text-center text-slate-500 mt-3">
            Acesso restrito. Use o admin criado pelo seed.
          </p>
        </form>
      </div>
    </div>
  );
}
