"use client";

import { useEffect, useState } from "react";
import { getQuestionsByPhase } from "../../hooks/useQuestions";
import { submitAnswer, finishQuiz } from "../../hooks/useAnswers";

export default function QuizPage({ params }: any) {
  const phaseId = params.phaseId;

  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    async function load() {
      const qs = await getQuestionsByPhase(phaseId);
      setQuestions(qs);
      setLoading(false);
    }

    load();
  }, [phaseId]);

  if (loading) return <p className="p-6">Carregando quiz...</p>;

  if (finished)
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Quiz Finalizado!</h1>
        <p className="text-lg">
          Você acertou{" "}
          <span className="font-semibold text-green-600">
            {answers.filter((a: any) => a.correct).length}
          </span>{" "}
          de {questions.length} questões.
        </p>

        <a
          href={`/estudos/fase/${phaseId}`}
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Voltar para a Fase
        </a>
      </div>
    );

  const question = questions[current];

  async function responder(alternative: string) {
    const result = await submitAnswer(question.id, alternative);

    setAnswers((prev) => [...prev, result]);

    if (current + 1 === questions.length) {
      await finishQuiz(phaseId);
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>

      <p className="text-gray-700 mb-4">
        Questão {current + 1} de {questions.length}
      </p>

      <div className="border p-4 rounded bg-white shadow">
        <p className="text-lg font-semibold mb-4">{question.question}</p>

        {question.alternatives.map((alt: string, i: number) => (
          <button
            key={i}
            onClick={() => responder(alt)}
            className="block w-full text-left bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded mb-2"
          >
            {alt}
          </button>
        ))}
      </div>
    </div>
  );
}
