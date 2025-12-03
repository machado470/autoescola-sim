"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function FasePage() {
  const router = useRouter();
  const { categoryId, phaseId } = useParams();

  const [phase, setPhase] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  async function load() {
    const u = JSON.parse(localStorage.getItem("authUser") || "{}");
    setUser(u);

    // fase
    const ph = await api.get(`/phases/${phaseId}`);
    setPhase(ph.data);

    // aulas
    const les = await api.get("/lessons");
    const filtered = les.data.filter((l: any) => l.phaseId === phaseId);
    setLessons(filtered);

    // progresso
    const pr = await api.get(`/student-progress/${u.id}/${phaseId}`);
    setProgress(pr.data || null);

    // se não existir → iniciar automaticamente
    if (!pr.data) {
      await api.post("/student-progress/start", {
        userId: u.id,
        phaseId,
      });

      const updated = await api.get(`/student-progress/${u.id}/${phaseId}`);
      setProgress(updated.data || null);
    }
  }

  async function concluirAula() {
    await api.post("/student-progress/complete-lesson", {
      userId: user.id,
      phaseId,
    });

    load();
  }

  async function finalizarFase() {
    await api.post("/student-progress/finish-phase", {
      userId: user.id,
      phaseId,
    });

    router.push(`/estudos/${categoryId}`);
  }

  useEffect(() => {
    load();
  }, []);

  if (!phase) return <p>Carregando...</p>;

  const aulasConcluidas = progress?.completedLessons || 0;
  const totalAulas = lessons.length;
  const faseConcluida = progress?.isDone === true;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {phase.order}. {phase.name}
      </h1>

      {/* Progresso da fase */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Aulas concluídas: {aulasConcluidas} / {totalAulas}
        </p>

        <div className="w-full bg-gray-200 h-3 rounded mt-1">
          <div
            className="bg-blue-600 h-3 rounded"
            style={{
              width:
                totalAulas === 0
                  ? "0%"
                  : `${Math.min((aulasConcluidas / totalAulas) * 100, 100)}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Botão treinar questões */}
      <button
        onClick={() =>
          router.push(`/estudos/${categoryId}/${phaseId}/questoes`)
        }
        className="px-4 py-2 bg-purple-600 text-white rounded mb-6"
      >
        Treinar Questões da Fase
      </button>

      {/* Aulas */}
      <h2 className="text-xl font-semibold mb-3">Aulas</h2>

      <ul className="flex flex-col gap-3 mb-6">
        {lessons.length === 0 && <p>Nenhuma aula nesta fase.</p>}

        {lessons.map((l) => (
          <li key={l.id} className="border p-3 rounded bg-white shadow">
            <strong>{l.title}</strong>
            <p className="text-sm mt-1">{l.content}</p>
          </li>
        ))}
      </ul>

      {/* Botões */}
      {!faseConcluida && (
        <div className="flex gap-3">
          <button
            onClick={concluirAula}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Concluir Aula
          </button>

          {aulasConcluidas === totalAulas && totalAulas > 0 && (
            <button
              onClick={finalizarFase}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Finalizar Fase
            </button>
          )}
        </div>
      )}

      {faseConcluida && (
        <button
          onClick={() => router.push(`/estudos/${categoryId}`)}
          className="px-4 py-2 bg-green-700 text-white rounded"
        >
          Fase concluída! Voltar
        </button>
      )}
    </div>
  );
}
