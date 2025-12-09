import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import BottomNav from "../../components/ui/BottomNav";
import { colors } from "../../design/colors";
import useAuth from "../../store/auth";

export default function StudentDashboard() {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  const { token } = useAuth();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3001/students/me/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        setData(json);
      } catch (e) {
        console.log("Erro ao carregar dashboard:", e);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: palette.background,
          color: palette.text,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
        }}
      >
        Carregando...
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: palette.background,
          color: palette.text,
          padding: "20px",
        }}
      >
        <h2>Erro ao carregar dados do aluno.</h2>
      </div>
    );
  }

  const { user, phases } = data;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.background,
        color: palette.text,
        paddingBottom: "80px",
      }}
    >
      <div style={{ padding: "20px" }}>
        {/* Mascote */}
        <div style={{ fontSize: "60px", textAlign: "center" }}>🚧</div>

        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          Bem-vindo, {user.name}
        </h1>

        {/* XP */}
        <Card style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "1rem", marginBottom: "6px" }}>XP</p>
          <ProgressBar value={user.xp % 100} color={palette.progressGreen} />
          <p style={{ marginTop: "6px", fontSize: "0.85rem", color: palette.textSecondary }}>
            {user.xp} XP total
          </p>
        </Card>

        {/* Fases */}
        <h2 style={{ marginBottom: "10px" }}>Seu Progresso</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {phases.map((phase: any) => (
            <Card key={phase.id}>
              <h3 style={{ marginBottom: "6px" }}>{phase.name}</h3>

              <ProgressBar value={phase.percent} color={palette.progressYellow} />

              <p
                style={{
                  marginTop: "6px",
                  fontSize: "0.85rem",
                  color: palette.textSecondary,
                }}
              >
                {phase.percent.toFixed(0)}% concluído ({phase.completed}/{phase.totalItems})
              </p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Button style={{ marginTop: "20px" }}>Iniciar Próxima Fase</Button>
      </div>

      <BottomNav />
    </div>
  );
}
