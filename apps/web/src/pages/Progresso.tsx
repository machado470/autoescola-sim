import { useProgressStore } from "../store/useProgressStore";

export default function Progresso() {
  const xp = useProgressStore(s => s.xp);
  const streak = useProgressStore(s => s.streak);
  const reset = useProgressStore(s => s.reset);

  const level = Math.floor(xp / 100) + 1; // 100 XP por nível
  const cur = xp % 100;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Progresso</h2>
      <div className="border rounded-xl p-4">
        <div className="text-sm">Nível</div>
        <div className="text-2xl font-bold">{level}</div>
        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-800 rounded-xl">
          <div
            className="h-2 rounded-xl bg-primary"
            style={{ width: `${(cur/100)*100}%` }}
          />
        </div>
        <div className="text-xs mt-1">{cur}/100 XP para o próximo nível</div>
      </div>

      <div className="border rounded-xl p-4">
        <div className="text-sm">Streak (dias seguidos)</div>
        <div className="text-2xl font-bold">{streak} 🔥</div>
      </div>

      <button onClick={reset} className="text-sm underline">
        Resetar progresso (local)
      </button>
    </div>
  );
}
