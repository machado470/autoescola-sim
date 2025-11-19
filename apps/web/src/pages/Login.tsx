import { useState } from "react";
import api from "../lib/api";
import { saveAuth } from "../lib/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@autoescola.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      saveAuth(res.data.access_token, { id: 1, email });
      window.location.href = "/"; 
    } catch (err) {
      alert("Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-5">
      <div className="bg-surface border border-border shadow-xl p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-text2">Email</label>
            <input
              className="w-full px-3 py-3 rounded-md bg-card text-text border border-border focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          <div>
            <label className="block mb-1 text-text2">Senha</label>
            <input
              className="w-full px-3 py-3 rounded-md bg-card text-text border border-border focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-primary hover:bg-primaryHover text-black py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <Link
          to="/"
          className="block text-center mt-4 text-text2 hover:underline"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
