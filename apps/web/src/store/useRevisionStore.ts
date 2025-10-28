import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Question } from "./useExamStore";

type RevisionState = {
  items: Question[];
  addMany: (qs: Question[]) => void;
  clear: () => void;
};

export const useRevisionStore = create<RevisionState>()(
  persist(
    (set, get) => ({
      items: [],
      addMany: (qs) => {
        // evita duplicadas por id
        const map = new Map(get().items.map(q => [q.id, q]));
        qs.forEach(q => map.set(q.id, q));
        set({ items: Array.from(map.values()) });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "revision" }
  )
);
