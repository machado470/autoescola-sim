import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { colors } from "../../design/colors";
import useAuth from "../../store/auth";

export default function Login() {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao entrar");
        return;
      }

      // salvar token e role
      login(data.access_token, data.user.role);

      // REDIRECIONAMENTO
      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/aluno");
      }

    } catch (e) {
      setError("Erro de conexão com o servidor");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Card style={{ width: "350px", padding: "20px" }}>
        <div style={{ fontSize: "60px", textAlign: "center" }}>🚧</div>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Entrar</h2>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@autoescola.com"
          style={{ marginBottom: "10px" }}
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          style={{ marginBottom: "20px" }}
        />

        <Button onClick={handleLogin}>Entrar</Button>
      </Card>
    </div>
  );
}
