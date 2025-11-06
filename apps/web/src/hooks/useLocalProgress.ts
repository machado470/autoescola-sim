import { useCallback } from "react";

export type Attempt = {
  when: string;             // ISO string
  category: string;
  correct: number;
  total: number;
  gainedXp: number;
};

const KEY = "aesim_history_v1";

export function useLocalProgress() {
  const read = useCallback((): Attempt[] => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
  }, []);

  const push = useCallback((a: Attempt) => {
    const data = read();
    data.unshift(a);
    localStorage.setItem(KEY, JSON.stringify(data.slice(0, 50)));
  }, [read]);

  return { read, push };
}
