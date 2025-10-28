import React from "react";
import QuestionCard from "../components/QuestionCard";
import { useExamSession } from "../hooks/useExamSession";

function fmt(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function ExamSessionPage() {
  const { state, progress, select } = useExamSession();

  if (state.loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="animate-pulse text-white/70">Carregando sessão...</div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-red-400">Erro: {state.error}</div>
      </div>
    );
  }

  if (state.finished) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Sessão finalizada</h1>
          <p className="text-white/70">Em breve mostraremos o resultado detalhado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="w-2/3">
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div className="h-3 bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-white/60">
            Questão {state.index + 1} de {state.total}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/60">Tempo restante</p>
          <p className="text-2xl font-bold tabular-nums">{fmt(state.remainingSec)}</p>
        </div>
      </div>

      {state.question && (
        <QuestionCard question={state.question} onSelect={select} disabled={false} />
      )}

      <div className="mt-6 flex items-center justify-between text-white/60 text-sm">
        <span>ID sessão: {state.sessionId.slice(0, 8)}...</span>
        <span>Clique na alternativa para avançar</span>
      </div>
    </div>
  );
}
