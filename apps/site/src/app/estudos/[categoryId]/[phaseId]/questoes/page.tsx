"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function QuestoesDaFase() {
  const router = useRouter();
  const { categoryId, phaseId } = useParams();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [finished, setFinished] = useState(false);

  async function load() {
    const u = JSON.parse(localStorage.getItem("authUser") || "{}");
    setUser(u);

    // carrega todas perguntas
    const q = await api.get("/questions");
    const filtered = q.data.filter((p: any) => p.phaseId === phaseId);
    setQuestions(filtered);
  }

  async function responder(alternativa: string) {
    const question = questions[currentIndex];

    const correta = question.correct === alternativa;

    // registra resposta
    await api.post("/student-progress/answer", {
      userId: user.id,
      phaseId,
      correct: correta,
    });

    // avança para a próxima
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (!questions.length) return <p>Carregando...</p>;

  if (finished)
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Treino finalizado!</h1>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded mt-4"
          onClick={() => router.push(`/estudos/${categoryId}/${phaseId}`)}
        >
          Voltar para a fase
        </button>
      </div>
    );

  const q = questions[currentIndex];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Pergunta {currentIndex + 1} de {questions.length}
      </h1>

      <div className="p-4 bg-white rounded shadow mb-6">
        <p className="font-semibold mb-4">{q.statement}</p>

        {["A", "B", "C", "D"].map((opt) => (
          <button
            key={opt}
            onClick={() => responder(opt)}
            className="block w-full text-left border p-3 rounded mb-2 hover:bg-gray-100"
          >
            <strong>{opt}:</strong> {q["option" + opt]}
          </button>
        ))}
      </div>
    </div>
  );
}
