import { Link, useLocation } from "react-router-dom"
import { recordAttempt } from "../lib/recordAttempt";
import { useEffect, useMemo } from "react";
import { useProgressStore } from "../store/progress";

export default function Result() {
  const { state } = useLocation() as any;
  const { correct = 0, total = 0, gained = 0 } = state || {};
  const { incXP } = useProgressStore();

  const pct = useMemo(() => Math.round((correct / Math.max(total, 1)) * 100), [correct, total]);

  // medalha e feedback visual
  const medal = pct >= 90 ? "🥇 Ouro"
              : pct >= 70 ? "🥈 Prata"
              : pct >= 50 ? "🥉 Bronze"
              : "💀 Precisa treinar";

  const msg = pct >= 90
    ? "Excelente! Você dominou o tema."
    : pct >= 70
    ? "Muito bom! Um pouco mais de prática e chega no ouro."
    : pct >= 50
    ? "Bom começo. Continue praticando."
    : "Estude mais um pouco e volte a tentar.";

  // registra XP e histórico
  useEffect(() => {
    if (gained > 0) incXP(0); // apenas sincroniza
    const data = { date: new Date().toISOString(), pct, correct, total, gained };
    const history = JSON.parse(localStorage.getItem("aesim_history") || "[]");
    history.unshift(data);
    localStorage.setItem("aesim_history", JSON.stringify(history.slice(0, 10)));
  }, [gained, pct, correct, total, incXP]);

  return (
    <div className="mx-auto max-w-md text-center space-y-6 mt-8">
      <div className="text-6xl">{medal.split(" ")[0]}</div>
      <h2 className="text-3xl font-extrabold">{medal.split(" ")[1]}</h2>
      <p className="text-slate-600">{msg}</p>

      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-4xl font-black text-brand-blue">{pct}%</p>
        <p className="text-sm text-slate-500">
          Você acertou {correct} de {total} perguntas.
        </p>
        <p className="mt-2 text-green-600 font-semibold">+{gained} XP</p>
      </div>

      <div className="flex justify-center gap-4">
        <Link
          to="/"
          className="px-5 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-blue/90"
        >
          Voltar ao início
        </Link>
        <Link
          to="/quiz/sinalizacao"
          className="px-5 py-3 rounded-xl bg-slate-200 font-semibold hover:bg-slate-300"
        >
          Tentar novamente
        </Link>
      </div>

      <div className="mt-8 text-left text-xs text-slate-500">
        <h4 className="font-semibold mb-1">Últimos resultados:</h4>
        <ul className="space-y-1">
          {JSON.parse(localStorage.getItem("aesim_history") || "[]").map(
            (r: any, i: number) => (
              <li key={i} className="flex justify-between border-b border-slate-100">
                <span>{new Date(r.date).toLocaleDateString()}</span>
                <span>{r.pct}%</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
