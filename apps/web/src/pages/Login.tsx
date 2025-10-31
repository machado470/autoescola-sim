import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("admin@aes.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login inválido");
      }

      const data = await res.json();
      // salva token
      localStorage.setItem("aes_token", data.access_token);
      localStorage.setItem("aes_user", JSON.stringify(data.user));

      // redireciona
      window.location.href = "/app";
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow rounded-xl p-8 w-full max-w-md border border-slate-200">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">AutoEscola-Sim</h1>
        <p className="text-slate-500 mb-4 text-sm">
          Entre com o usuário de teste: <strong>admin@aes.com</strong> / <strong>123456</strong>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">E-mail</label>
            <input
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Senha</label>
            <input
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white rounded-lg py-2 font-semibold hover:bg-purple-700 disabled:bg-purple-300 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
