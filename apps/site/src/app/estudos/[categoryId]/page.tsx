"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function EstudosCategoriaPage() {
  const router = useRouter();
  const { categoryId } = useParams();

  const [category, setCategory] = useState<any>(null);
  const [phases, setPhases] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [progressMap, setProgressMap] = useState<Record<string, any>>({});

  async function load() {
    const u = JSON.parse(localStorage.getItem("authUser") || "{}");
    setUser(u);

    // categoria
    const cat = await api.get(`/categories/${categoryId}`);
    setCategory(cat.data);

    // fases (já vem com _count.lessons)
    const ph = await api.get(`/phases`);
    const filtered = ph.data.filter((p: any) => p.categoryId === categoryId);
    setPhases(filtered);

    // progresso por fase
    const map: Record<string, any> = {};
    for (const phase of filtered) {
      const pr = await api.get(`/student-progress/${u.id}/${phase.id}`);
      if (pr.data) map[phase.id] = pr.data;
    }

    setProgressMap(map);
  }

  useEffect(() => {
    load();
  }, []);

  if (!category) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{category.name}</h1>

      <ul className="flex flex-col gap-4">
        {phases.map((phase) => {
          const prog = progressMap[phase.id];

          const status = prog
            ? prog.isDone
              ? "Concluída"
              : "Em andamento"
            : "Não iniciada";

          const aulas = prog?.completedLessons || 0;
          const acertos = prog?.correctAnswers || 0;
          const erros = prog?.wrongAnswers || 0;

          // número REAL de aulas da fase (Prisma _count)
          const totalAulas = phase._count?.lessons ?? 0;

          const pct =
            totalAulas > 0
              ? Math.min((aulas / totalAulas) * 100, 100)
              : 0;

          return (
            <li
              key={phase.id}
              className="border p-4 rounded bg-white shadow flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <strong>
                  {phase.order}. {phase.name}
                </strong>

                <span
                  className={
                    status === "Concluída"
                      ? "text-green-600"
                      : status === "Em andamento"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }
                >
                  {status}
                </span>
              </div>

              {/* BARRA DE PROGRESSO */}
              {prog && (
                <>
                  <p className="text-xs text-gray-600">
                    Aulas: {aulas} / {totalAulas} | Acertos: {acertos} | Erros: {erros}
                  </p>

                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-blue-600 h-2 rounded"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </>
              )}

              {/* Botões */}
              {!prog && (
                <button
                  onClick={() =>
                    router.push(`/estudos/${categoryId}/${phase.id}`)
                  }
                  className="px-3 py-1 bg-green-600 text-white rounded mt-2"
                >
                  Iniciar fase
                </button>
              )}

              {prog && (
                <button
                  onClick={() =>
                    router.push(`/estudos/${categoryId}/${phase.id}`)
                  }
                  className="px-3 py-1 bg-blue-600 text-white rounded mt-2"
                >
                  Continuar
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
