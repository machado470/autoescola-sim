import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import BottomNav from "../../components/ui/BottomNav";
import { colors } from "../../design/colors";
import useAuth from "../../store/auth";

export default function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];
  const { token } = useAuth();

  const [lesson, setLesson] = useState<any>(null);
  const [tree, setTree] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [nextId, setNextId] = useState<string | null>(null);
  const [prevId, setPrevId] = useState<string | null>(null);

  const [completed, setCompleted] = useState(false);

  // LOAD AULA + TRILHA
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`http://localhost:3001/lessons/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const lessonJson = await res.json();
        setLesson(lessonJson);

        const treeRes = await fetch(
          "http://localhost:3001/students/me/lessons-tree",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const treeJson = await treeRes.json();
        setTree(treeJson);

        computeNavigation(lessonJson, treeJson);
        checkCompleted(lessonJson, treeJson);
      } catch (e) {
        console.log("Erro ao carregar aula:", e);
      }
      setLoading(false);
    }

    load();
  }, [id]);

  // Identifica se aula já concluída
  function checkCompleted(currentLesson: any, fullTree: any[]) {
    for (const category of fullTree) {
      for (const phase of category.phases) {
        for (const l of phase.lessons) {
          if (l.id === currentLesson.id) {
            setCompleted(l.completed);
            return;
          }
        }
      }
    }
  }

  // NAVEGAÇÃO
  function computeNavigation(currentLesson: any, fullTree: any[]) {
    let found = false;

    for (const category of fullTree) {
      for (const phase of category.phases) {
        for (let i = 0; i < phase.lessons.length; i++) {
          const l = phase.lessons[i];

          if (l.id === currentLesson.id) {
            found = true;

            if (i > 0) {
              setPrevId(phase.lessons[i - 1].id);
            }

            if (i < phase.lessons.length - 1) {
              setNextId(phase.lessons[i + 1].id);
            }

            break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }
  }

  // CONCLUIR AULA
  async function handleComplete() {
    const res = await fetch(
      `http://localhost:3001/students/me/lessons/${id}/complete`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) {
      alert("Erro ao concluir aula.");
      return;
    }

    setCompleted(true);

    if (nextId) {
      navigate(`/aluno/aulas/${nextId}`);
    } else {
      alert("Você concluiu a última aula!");
      navigate("/aluno/trilha");
    }
  }

  // LOADING
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
        Carregando aula...
      </div>
    );
  }

  if (!lesson) {
    return <div>Erro ao carregar aula.</div>;
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
        <h1>{lesson.title}</h1>

        <p style={{ color: palette.textSecondary, marginBottom: "20px" }}>
          {lesson.phase?.name} • {lesson.category?.name}
        </p>

        {lesson.imageUrl && (
          <img
            src={lesson.imageUrl}
            style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
          />
        )}

        {lesson.videoUrl && (
          <video
            controls
            style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
            src={lesson.videoUrl}
          />
        )}

        <Card>
          <p style={{ whiteSpace: "pre-line" }}>{lesson.content}</p>
        </Card>

        {/* Botão de conclusão */}
        {!completed ? (
          <Button onClick={handleComplete} style={{ marginTop: "20px" }}>
            Concluir Aula ✔
          </Button>
        ) : (
          <Button disabled style={{ marginTop: "20px" }}>
            Aula já concluída ✔
          </Button>
        )}

        {/* Navegação */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          {prevId ? (
            <Button onClick={() => navigate(`/aluno/aulas/${prevId}`)}>
              ← Voltar
            </Button>
          ) : (
            <div />
          )}

          {nextId ? (
            <Button onClick={() => navigate(`/aluno/aulas/${nextId}`)}>
              Próxima →
            </Button>
          ) : (
            <Button disabled>Fim da Trilha ✔</Button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
