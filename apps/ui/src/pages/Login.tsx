import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const API = import.meta.env.VITE_API_URL as string;

export default function Login() {
  const [email, setEmail] = useState("admin@local");
  const [password, setPassword] = useState("admin");
  const [err, setErr] = useState<string | null>(null);
  const setToken = useAuth((s) => s.setToken);
  const nav = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      const token = data?.access_token;
      if (!token) throw new Error("Token não retornado");
      setToken(token);
      nav("/quiz");
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || "Erro ao logar");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "4rem auto", fontFamily: "sans-serif" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "grid", gap: 12 }}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="senha" />
        <button type="submit">Entrar</button>
        {err && <pre style={{ color: "crimson" }}>{String(err)}</pre>}
      </form>
      <p style={{opacity:.7,marginTop:8}}>Dica rápida: admin@local / admin</p>
    </div>
  );
}
