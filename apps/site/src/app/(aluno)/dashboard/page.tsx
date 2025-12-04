"use client";

import { useDashboard } from "@/hooks/useDashboard";

/* eslint-disable @next/next/no-img-element */

export default function DashboardAluno() {
  const { data, loading } = useDashboard();

  if (loading) return <p>Carregando dashboard...</p>;
  if (!data) return <p>Não foi possível carregar os dados.</p>;

  return (
    <div className="space-y-6">

      {/* Botão grande */}
      <a
        href="/(aluno)/quiz"
        className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl text-lg font-semibold"
      >
        Iniciar Simulado
      </a>

      {/* Categorias */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        {data.categories.map((cat: any) => (
          <div key={cat.id} className="flex items-center gap-3">
            <img src="/icone-cone.png" className="w-14 h-14" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.progress}%</p>

              <div className="h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${cat.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* XP */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <img src="/icone-cone.png" className="w-20 h-20" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">XP</h3>
          <p className="text-sm text-gray-500">{data.xp} XP</p>

          <div className="h-2 bg-gray-200 rounded-full mt-1">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${Math.min(data.xp / 5, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

    </div>
  );
}
