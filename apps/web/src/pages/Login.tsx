import { FormEvent, useState } from "react";
import api from "../lib/api";
import { saveAuth } from "../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("admin@autoescola.com");
  const [senha, setSenha] = useState("123456");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email,
        password: senha,
      });

      saveAuth(res.data.access_token, res.data.user);
      alert("Login REAL realizado com sucesso!");
      // aqui depois a gente redireciona para /dashboard
    } catch (err) {
      console.error(err);
      alert("Falha no login. Confira email/senha ou se a API está rodando.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <div className="card card-center">
        <div className="card-header">
          <div>
            <p className="badge">ÁREA DO ALUNO</p>
            <h1 className="card-title">Login</h1>
            <p className="card-subtitle">
              Use o email de teste admin@autoescola.com e senha 123456.
            </p>
          </div>
        </div>

        <div className="card-body">
          <form className="stack" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                className="input"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
