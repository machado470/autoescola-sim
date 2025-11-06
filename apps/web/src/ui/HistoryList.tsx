import React from "react";
import { Attempt } from "../hooks/useLocalProgress";

export default function HistoryList({ items }: { items: Attempt[] }) {
  if (!items.length) return <p className="text-slate-500">Sem histórico ainda. Faça um quiz!</p>;
  return (
    <ul className="space-y-2">
      {items.map((a, i) => (
        <li key={i} className="rounded-xl border bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">{a.category}</div>
            <div className="text-sm text-slate-500">{new Date(a.when).toLocaleString()}</div>
          </div>
          <div className="text-sm text-slate-600">
            Acertos: <b>{a.correct}/{a.total}</b> &middot; XP +<b>{a.gainedXp}</b>
          </div>
        </li>
      ))}
    </ul>
  );
}
