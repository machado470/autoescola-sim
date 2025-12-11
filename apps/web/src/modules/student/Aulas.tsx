import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

type Lesson = {
  id: string;
  title: string;
  content: string;
  order: number;
  imageUrl?: string | null;
  videoUrl?: string | null;
  category: { id: string; name: string };
  phase: { id: string; name: string };
};

export default function Aulas() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3001/lessons", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLessons(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Layout>Carregando aulas…</Layout>;
  }

  if (lessons.length === 0) {
    return (
      <Layout>
        <p>Nenhuma aula cadastrada.</p>
      </Layout>
    );
  }

  // Organiza por fase
  const phases = lessons.reduce<Record<string, Lesson[]>>((groups, lesson) => {
    if (!groups[lesson.phase.name]) groups[lesson.phase.name] = [];
    groups[lesson.phase.name].push(lesson);
    return groups;
  }, {});

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Aulas</h1>

      {Object.entries(phases).map(([phaseName, phaseLessons]) => (
        <div key={phaseName} className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{phaseName}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {phaseLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-xl bg-white dark:bg-[#161B22] shadow overflow-hidden"
              >
                {lesson.imageUrl ? (
                  <img
                    src={lesson.imageUrl}
                    alt={lesson.title}
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="h-40 w-full bg-gray-300 dark:bg-[#1F242C]" />
                )}

                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{lesson.title}</h3>

                  <button
                    onClick={() => navigate(`/aluno/aulas/${lesson.id}`)}
                    className="mt-3 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                  >
                    Assistir Aula
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}
