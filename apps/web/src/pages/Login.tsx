import { useState, FormEvent } from "react";

export default function Login() {
  const [email, setEmail] = useState("admin@autoescola.com");
  const [password, setPassword] = useState("123456");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("LOGIN FAKE:", { email, password });
    alert("Login de teste enviado (sem chamar API ainda).");
  }

  return (
    <div className="app-shell">
      <div className="card card-center">
        <div className="card-header">
          <div>
            <p className="badge">Área do aluno</p>
            <h1 className="page-title">Login</h1>
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="stack">
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            <button type="submit" className="btn btn-primary btn-block">
              Entrar (fake)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
