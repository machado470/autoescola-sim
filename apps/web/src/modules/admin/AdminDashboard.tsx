import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { colors } from "../../design/colors";
import useAuth from "../../store/auth";

export default function AdminDashboard() {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  const { logout, token } = useAuth();

  const [stats, setStats] = useState({
    alunos: 0,
    questoes: 0,
    simulados: 0,
  });

  // Carregar dados da API (mock agora)
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3001/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setStats({
            alunos: data.totalStudents || 0,
            questoes: data.totalQuestions || 0,
            simulados: data.totalSimulados || 0,
          });
        }
      } catch (e) {
        console.log("Erro ao carregar admin:", e);
      }
    }

    load();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.background,
        color: palette.text,
        padding: "20px",
      }}
    >
      {/* Mascote */}
      <div style={{ fontSize: "60px", textAlign: "center" }}>🛠️</div>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Painel Administrativo
      </h1>

      {/* Estatísticas */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Card>
          <h3>Total de Alunos</h3>
          <p style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{stats.alunos}</p>
        </Card>

        <Card>
          <h3>Total de Questões</h3>
          <p style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{stats.questoes}</p>
        </Card>

        <Card>
          <h3>Total de Simulados</h3>
          <p style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{stats.simulados}</p>
        </Card>
      </div>

      {/* Gestão */}
      <Card style={{ marginTop: "20px" }}>
        <h3>Gerenciar Sistema</h3>
        <p style={{ color: palette.textSecondary, marginTop: "6px" }}>
          Em breve: CRUD de questões, categorias, alunos...
        </p>
      </Card>

      {/* Botão logout */}
      <Button
        onClick={() => {
          logout();
          window.location.href = "/login";
        }}
        style={{ marginTop: "20px" }}
      >
        Sair
      </Button>
    </div>
  );
}
