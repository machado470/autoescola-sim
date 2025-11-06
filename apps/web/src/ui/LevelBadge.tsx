import React from "react";
import { useLevel } from "../store/level";

export default function LevelBadge() {
  const { level, title, totalXp } = useLevel();
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border px-4 py-2 shadow-sm bg-white">
      <div className="h-8 w-8 rounded-xl bg-orange-500" />
      <div className="leading-tight">
        <div className="text-sm text-slate-500">Nível {level}</div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-slate-400">{totalXp} XP</div>
      </div>
    </div>
  );
}
