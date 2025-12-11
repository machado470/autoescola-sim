import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import BottomNav from "../../components/ui/BottomNav";
import { colors } from "../../design/colors";
import useAuth from "../../store/auth";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  const { token } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [tree, setTree] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Dashboard
        const res = await fetch("http://localhost:3001/students/me/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setData(json);

        // Trilha para achar a próxima aula
        const treeRes = await fetch(
          "http://localhost:3001/students/me/lessons-tree",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const treeJson = await treeRes.json();
        setTree(treeJson);
      } catch (e) {
        console.log("Erro:", e);
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
        <h2>Erro ao carregar dados.</h2>
      </div>
    );
  }

  // Encontrar próxima aula
  let nextLesson: any = null;
  for (const c of tree) {
    for (const p of c.phases) {
      if (!p.finished) {
        nextLesson = p.lessons[0];
        break;
      }
    }
    if (nextLesson) break;
  }

  const {
    name,
    lessonsCompleted,
    correctAnswers,
    totalQuestions,
    lastSimulations,
  } = data;

  const percent =
    totalQuestions > 0
      ? Math.min(100, (correctAnswers / totalQuestions) * 100)
      : 0;

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
        <div style={{ fontSize: "60px", textAlign: "center" }}>🚧</div>

        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          Bem-vindo, {name}
        </h1>

        {/* PROGRESSO GERAL */}
        <Card style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "1rem", marginBottom: "6px" }}>
            Seu Progresso Geral
          </p>
          <ProgressBar value={percent} color={palette.progressGreen} />
          <p
            style={{
              marginTop: "6px",
              fontSize: "0.85rem",
              color: palette.textSecondary,
            }}
          >
            {correctAnswers}/{totalQuestions} questões certas (
            {percent.toFixed(0)}%)
          </p>
        </Card>

        {/* AULAS */}
        <Card style={{ marginBottom: "20px" }}>
          <p style={{ marginBottom: "6px" }}>
            Aulas Concluídas: <strong>{lessonsCompleted}</strong>
          </p>

          {nextLesson ? (
            <Button
              onClick={() => navigate(`/aluno/aulas/${nextLesson.id}`)}
              style={{ marginBottom: "10px" }}
            >
              Continuar Curso →
            </Button>
          ) : (
            <Button disabled>Curso Concluído ✔</Button>
          )}

          <Button onClick={() => navigate("/aluno/trilha")}>
            Ver Trilha Completa
          </Button>
        </Card>

        {/* SIMULADOS */}
        <h2 style={{ marginBottom: "10px" }}>Últimos Simulados</h2>

        {lastSimulations.length === 0 && (
          <p style={{ color: palette.textSecondary }}>
            Nenhum simulado realizado ainda.
          </p>
        )}

        {lastSimulations.map((sim: any) => (
          <Card key={sim.id} style={{ marginBottom: "10px" }}>
            <p>
              📘 <strong>{sim.percentage}%</strong> de acertos
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: palette.textSecondary,
                marginTop: "6px",
              }}
            >
              {new Date(sim.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </Card>
        ))}

        <Button style={{ marginTop: "20px" }}>Iniciar Simulado</Button>
      </div>

      <BottomNav />
    </div>
  );
}
