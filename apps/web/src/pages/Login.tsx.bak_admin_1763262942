import { FormEvent, useState } from "react";
import { login, whoAmI } from "../lib/api";

export function LoginPage() {
  const [email, setEmail] = useState("admin@autoescola.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const { access_token } = await login(email, password);
      setToken(access_token);
      localStorage.setItem("auth_token", access_token);

      const me = await whoAmI(access_token);
      setUser(me);
    } catch (err: any) {
      setError(err.message ?? "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#020617",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
          border: "1px solid rgba(148,163,184,0.3)",
        }}
      >
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>AutoEscola Sim</h1>
        <p style={{ marginBottom: 24, color: "#9ca3af" }}>
          Login de administrador (API local em <code>/auth/login</code>).
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ fontSize: 14 }}>E-mail</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #4b5563",
                background: "#020617",
                color: "#e5e7eb",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ fontSize: 14 }}>Senha</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #4b5563",
                background: "#020617",
                color: "#e5e7eb",
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 8,
              padding: "10px 12px",
              borderRadius: 999,
              border: "none",
              cursor: loading ? "wait" : "pointer",
              background:
                "linear-gradient(135deg, #22c55e, #16a34a, #22c55e)",
              color: "#020617",
              fontWeight: 600,
            }}
          >
            {loading ? "Autenticando..." : "Entrar"}
          </button>
        </form>

        {error && (
          <div
            style={{
              marginTop: 16,
              padding: 10,
              borderRadius: 8,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.6)",
              fontSize: 13,
            }}
          >
            <strong>Erro:</strong> {error}
          </div>
        )}

        {token && (
          <div
            style={{
              marginTop: 16,
              padding: 10,
              borderRadius: 8,
              background: "rgba(56,189,248,0.06)",
              border: "1px solid rgba(56,189,248,0.4)",
              fontSize: 12,
              wordBreak: "break-all",
            }}
          >
            <div style={{ marginBottom: 4, fontWeight: 600 }}>Token JWT:</div>
            <code>{token}</code>
          </div>
        )}

        {user && (
          <div
            style={{
              marginTop: 16,
              padding: 10,
              borderRadius: 8,
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.5)",
              fontSize: 13,
            }}
          >
            <div style={{ marginBottom: 4, fontWeight: 600 }}>
              Usuário autenticado:
            </div>
            <div>ID: {user.id}</div>
            <div>Email: {user.email}</div>
          </div>
        )}
      </div>
    </div>
  );
}
