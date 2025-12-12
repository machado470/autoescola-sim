import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import BottomNav from "../../components/ui/BottomNav";
import { colors } from "../../design/colors";
import useAuth from "../../store/auth";

export default function LessonsList() {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  const { token } = useAuth();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3001/lessons", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        setLessons(json);
      } catch (e) {
        console.log("Erro ao carregar aulas:", e);
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
        }}
      >
        Carregando aulas...
      </div>
    );
  }

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
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
          Aulas Disponíveis
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <h3>{lesson.title}</h3>

              <p style={{ color: palette.textSecondary, marginBottom: "10px" }}>
                {lesson.phase.name} • {lesson.category.name}
              </p>

              <Button onClick={() => navigate(`/aluno/aulas/${lesson.id}`)}>
                Abrir Aula
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
