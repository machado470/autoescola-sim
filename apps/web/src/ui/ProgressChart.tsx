import React from "react";
import { Attempt } from "../hooks/useLocalProgress";

export default function ProgressChart({ items }: { items: Attempt[] }) {
  const last10 = items.slice(0, 10).reverse();
  if (!last10.length) return null;
  const max = Math.max(...last10.map(i => i.total || 10));
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-2 text-sm text-slate-500">Últimas tentativas (acertos)</div>
      <div className="flex items-end gap-2">
        {last10.map((a, i) => {
          const pct = (a.correct / (a.total || max)) || 0;
          return (
            <div key={i} className="flex-1">
              <div className="h-24 w-full rounded bg-slate-100">
                <div className="h-full origin-bottom rounded bg-blue-500" style={{ transform: `scaleY(${pct})` }} />
              </div>
              <div className="mt-1 text-center text-[10px] text-slate-500">{a.correct}/{a.total}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
