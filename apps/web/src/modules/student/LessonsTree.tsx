import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import BottomNav from "../../components/ui/BottomNav";
import { colors } from "../../design/colors";
import useAuth from "../../store/auth";

export default function LessonsTree() {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];
  const navigate = useNavigate();

  const { token } = useAuth();
  const [tree, setTree] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3001/students/me/lessons-tree", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        setTree(json);
      } catch (e) {
        console.log("Erro ao carregar trilha:", e);
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
        Carregando trilha...
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
          Trilha de Aprendizado
        </h1>

        {tree.map((category) => (
          <div key={category.categoryId} style={{ marginBottom: "30px" }}>
            <h2>{category.categoryName}</h2>

            {category.phases.map((phase) => (
              <Card key={phase.phaseId} style={{ marginTop: "15px" }}>
                <h3 style={{ marginBottom: "10px" }}>{phase.phaseName}</h3>

                {phase.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    style={{
                      padding: "10px 0",
                      borderBottom: "1px solid #DDD",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      {lesson.title}
                      {lesson.completed && " ✔"}
                    </span>

                    <button
                      style={{
                        padding: "6px 10px",
                        background: palette.primary,
                        color: "#FFF",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/aluno/aulas/${lesson.id}`)}
                    >
                      Abrir →
                    </button>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
