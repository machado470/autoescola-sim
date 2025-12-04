"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { useState } from "react";
import api from "@/lib/api";

/* eslint-disable @next/next/no-img-element */

export default function QuizAluno() {
  const params = useSearchParams();
  const router = useRouter();

  const phaseId = params.get("phase") ?? "";
  const userId = "1"; // TEMP: substituir com usuário real depois

  const { questoes, loading } = useQuiz(phaseId);
  const [index, setIndex] = useState(0);
  const [sending, setSending] = useState(false);

  if (loading) return <p>Carregando quiz...</p>;
  if (!questoes.length) return <p>Nenhuma questão nesta fase.</p>;

  const q = questoes[index];

  // Registrar resposta
  async function handleAnswer(option: string) {
    if (sending) return;
    setSending(true);

    const isCorrect = option === q.correct;

    await api.post("/progress/answer", {
      userId,
      phaseId,
      isCorrect,
    });

    // próxima questão
    const next = index + 1;

    if (next < questoes.length) {
      setIndex(next);
      setSending(false);
      return;
    }

    // Finalizar fase
    await api.post("/progress/finish", {
      userId,
      phaseId,
    });

    router.push("/(aluno)/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <img src="/icone-cone.png" className="mx-auto w-16 h-16" />
        <h2 className="text-xl font-bold mt-2">Quiz</h2>

        <p className="text-gray-500">
          Pergunta {index + 1} de {questoes.length}
        </p>
      </div>

      <h3 className="text-center text-lg font-semibold">{q.statement}</h3>

      <div className="space-y-3">
        {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, i) => (
          <button
            key={i}
            disabled={sending}
            onClick={() => handleAnswer(opt)}
            className="w-full py-3 bg-white shadow rounded-xl text-left px-4 active:scale-[0.98]"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
