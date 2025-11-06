import { Link, useLocation } from "react-router-dom";
import { useProgressStore } from "../store/progress";

export default function Result() {
  const { state } = useLocation();
  const { xp } = useProgressStore();
  const { correct = 0, total = 0, gained = 0 } = state || {};

  return (
    <div className="mx-auto max-w-md text-center space-y-6">
      <h1 className="text-3xl font-extrabold mt-6">Resultado</h1>
      <div className="text-lg">
        Você acertou <strong>{correct}</strong> de <strong>{total}</strong> perguntas!
      </div>

      <div className="card p-4">
        <div className="text-2xl">🎯</div>
        <p className="mt-2 text-slate-700">Ganhou <strong>{gained}</strong> XP!</p>
        <p className="mt-1 text-slate-600">Total atual: {xp} XP</p>
      </div>

      <div className="flex flex-col gap-3">
        <Link to="/" className="btn btn-primary">Voltar ao início</Link>
        <button onClick={() => history.back()} className="btn btn-secondary">Refazer Quiz</button>
      </div>
    </div>
  );
}
