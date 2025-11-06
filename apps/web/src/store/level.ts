import { create } from "zustand";
import { persist } from "zustand/middleware";

type LevelState = {
  totalXp: number;          // soma de todas categorias
  lastGain: number;         // último ganho (para UI)
  level: number;            // derivado de totalXp
  title: string;            // nome do nível p/ UX
  addXp: (delta: number) => void;
  reset: () => void;
};

function levelFromXp(xp: number) {
  const lvl = Math.floor(xp / 500);
  const title =
    lvl >= 2 ? "Mestre da Direção" :
    lvl >= 1 ? "Aprendiz" :
               "Iniciante";
  return { lvl, title };
}

export const useLevel = create<LevelState>()(
  persist(
    (set, get) => ({
      totalXp: 0,
      lastGain: 0,
      level: 0,
      title: "Iniciante",
      addXp: (delta) => {
        const total = Math.max(0, get().totalXp + delta);
        const info = levelFromXp(total);
        set({ totalXp: total, lastGain: delta, level: info.lvl, title: info.title });
      },
      reset: () => set({ totalXp: 0, lastGain: 0, level: 0, title: "Iniciante" }),
    }),
    { name: "aesim_level_v1" }
  )
);
