import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";

type Lesson = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  phase: { id: string; name: string };
  category: { id: string; name: string };
};

export default function AulaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3001/lessons/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLesson(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Layout>Carregando aula…</Layout>;
  }

  if (!lesson) {
    return <Layout>Aula não encontrada.</Layout>;
  }

  return (
    <Layout>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Voltar
      </button>

      <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

      {/* Vídeo */}
      {lesson.videoUrl ? (
        <video
          controls
          className="w-full rounded-xl mb-6"
          src={lesson.videoUrl}
        />
      ) : lesson.imageUrl ? (
        <img
          src={lesson.imageUrl}
          className="w-full rounded-xl mb-6"
          alt="Imagem da aula"
        />
      ) : null}

      {/* Conteúdo */}
      <div className="prose dark:prose-invert max-w-none">
        {lesson.content}
      </div>

      <button
        className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
        onClick={() => alert("Função de concluir aula será implementada no MV3")}
      >
        Marcar como concluída
      </button>
    </Layout>
  );
}
