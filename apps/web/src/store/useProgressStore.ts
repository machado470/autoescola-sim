import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  xp: number;
  streak: number;
  lastPracticeDate?: string; // yyyy-mm-dd
  addXp: (points: number) => void;
  touchStreak: () => void;
  reset: () => void;
};

function today() {
  return new Date().toISOString().slice(0,10);
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastPracticeDate: undefined,
      addXp: (points) => set({ xp: get().xp + points }),
      touchStreak: () => {
        const t = today();
        const last = get().lastPracticeDate;
        if (last === t) return; // já contou hoje
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const y = yesterday.toISOString().slice(0,10);
        const nextStreak = last === y ? get().streak + 1 : 1;
        set({ streak: nextStreak, lastPracticeDate: t });
      },
      reset: () => set({ xp: 0, streak: 0, lastPracticeDate: undefined }),
    }),
    { name: "progress" }
  )
);
