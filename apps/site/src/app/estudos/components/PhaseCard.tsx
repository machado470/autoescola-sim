"use client";

import React, { useTransition } from "react";
import { startPhase } from "../hooks/usePhaseProgress";

export function PhaseCard({ phase, progress }: any) {
  const [pending, start] = useTransition();

  const percentage =
    progress?.totalLessons > 0
      ? Math.round((progress.completedLessons / progress.totalLessons) * 100)
      : 0;

  const started = !!progress;

  function handleStart() {
    start(async () => {
      await startPhase(phase.id);
      window.location.reload();
    });
  }

  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <h2 className="text-xl font-semibold">{phase.title}</h2>
      <p className="text-gray-600">{phase.description}</p>

      {started ? (
        <div className="mt-4">
          <div className="text-sm text-gray-700 mb-2">
            Progresso: {percentage}%
          </div>

          <a
            href={`/estudos/fase/${phase.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continuar
          </a>
        </div>
      ) : (
        <button
          onClick={handleStart}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={pending}
        >
          {pending ? "Iniciando..." : "Iniciar Fase"}
        </button>
      )}
    </div>
  );
}
