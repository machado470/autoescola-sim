"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function EstudosDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dados, setDados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const u = JSON.parse(localStorage.getItem("authUser") || "{}");
    setUser(u);

    const res = await api.get(`/student-progress/dashboard/${u.id}`);
    setDados(res.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meu Progresso</h1>

      <div className="flex flex-col gap-6">
        {dados.map((cat) => (
          <div
            key={cat.categoryId}
            className="border p-4 rounded bg-white shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              {cat.categoryName}
            </h2>

            {/* Barra geral */}
            <p className="text-sm mb-1">
              Progresso total: {cat.progressoTotal}%
            </p>
            <div className="w-full bg-gray-200 h-3 rounded mb-4">
              <div
                className="bg-blue-600 h-3 rounded"
                style={{ width: `${cat.progressoTotal}%` }}
              ></div>
            </div>

            {/* Fases */}
            <ul className="flex flex-col gap-2">
              {cat.fases.map((fase) => (
                <li
                  key={fase.phaseId}
                  className="border p-3 rounded flex justify-between"
                >
                  <div>
                    <strong>
                      {fase.order}. {fase.name}
                    </strong>
                    <p className="text-xs text-gray-600">
                      Aulas: {fase.aulasConcluidas}/{fase.totalAulas} |
                      Acertos: {fase.acertos} | Erros: {fase.erros}
                    </p>

                    <div className="w-full bg-gray-200 h-2 rounded mt-1">
                      <div
                        className="bg-purple-600 h-2 rounded"
                        style={{ width: `${fase.progresso}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded self-center"
                    onClick={() =>
                      router.push(
                        `/estudos/${cat.categoryId}/${fase.phaseId}`
                      )
                    }
                  >
                    Continuar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
