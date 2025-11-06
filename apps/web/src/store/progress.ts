import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CategoryKey = "sinalizacao" | "direcao-defensiva" | "mecanica";

type State = {
  xp: number;
  progress: Record<CategoryKey, number>; // 0..100
  incXP: (delta: number) => void;
  setProgress: (cat: CategoryKey, value: number) => void;
};

export const useProgressStore = create<State>()(
  persist(
    (set) => ({
      xp: 240,
      progress: {
        "sinalizacao": 60,
        "direcao-defensiva": 1,
        "mecanica": 20,
      },
      incXP: (delta) => set((s) => ({ xp: Math.max(0, s.xp + delta) })),
      setProgress: (cat, value) =>
        set((s) => ({
          progress: { ...s.progress, [cat]: Math.max(0, Math.min(100, value)) },
        })),
    }),
    { name: "aesim-progress", storage: createJSONStorage(() => localStorage) }
  )
);
