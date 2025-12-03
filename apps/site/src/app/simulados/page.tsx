"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { QuizAPI } from "@/lib/api-quiz";

export default function SimuladosPage() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState("");

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  async function loadCategorias() {
    const res = await api.get("/categories");
    setCategorias(res.data);
  }

  async function iniciar() {
    if (!categoryId) return;

    const res = await QuizAPI.start(categoryId);
    setQuiz(res.data);
    setAnswers({});
    setResult(null);
  }

  async function enviar() {
    const res = await QuizAPI.submit({
      quizId: quiz.quizId,
      answers,
    });

    setResult(res.data);
  }

  useEffect(() => {
    loadCategorias();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Simulados</h1>

      {/* Seleção de categoria */}
      {!quiz && (
        <div className="flex gap-3 items-end mb-8">
          <select
            className="border px-3 py-2 rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Selecione a categoria...</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={iniciar}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Iniciar Simulado
          </button>
        </div>
      )}

      {/* Perguntas */}
      {quiz && !result && (
        <div className="flex flex-col gap-6">
          {quiz.questions.map((q: any) => (
            <div key={q.id} className="border p-4 rounded shadow bg-white">
              <p className="font-semibold mb-2">{q.statement}</p>

              {["A", "B", "C", "D"].map((opt) => (
                <label key={opt} className="flex gap-2 mb-1">
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={(e) =>
                      setAnswers({ ...answers, [q.id]: e.target.value })
                    }
                  />
                  {q["option" + opt]}
                </label>
              ))}
            </div>
          ))}

          <button
            onClick={enviar}
            className="px-4 py-2 bg-green-600 text-white rounded mt-4"
          >
            Enviar Respostas
          </button>
        </div>
      )}

      {/* Resultado */}
      {result && (
        <div className="mt-8 p-4 bg-white border rounded shadow">
          <h2 className="text-xl font-bold mb-2">Resultado</h2>
          <p className="mb-2">Acertos: {result.correct}</p>
          <p className="mb-4">Erros: {result.incorrect}</p>

          <button
            onClick={() => {
              setQuiz(null);
              setResult(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Novo Simulado
          </button>
        </div>
      )}
    </div>
  );
}
