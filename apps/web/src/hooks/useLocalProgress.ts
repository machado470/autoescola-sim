import { useEffect, useState } from 'react';

export type Attempt = {
  id: string;
  category: 'Sinalização' | 'Direção Defensiva' | 'Mecânica';
  correct: number;
  total: number;
  startedAt: string;   // ISO
  finishedAt?: string; // ISO
};

const KEY = 'aesim:attempts';

export function loadAttempts(): Attempt[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attempt[]) : [];
  } catch {
    return [];
  }
}

export function saveAttempt(a: Attempt) {
  const list = [a, ...loadAttempts()].slice(0, 50);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearAttempts() {
  localStorage.removeItem(KEY);
}

export function useLocalProgress() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    setAttempts(loadAttempts());
  }, []);

  const addAttempt = (a: Attempt) => {
    saveAttempt(a);
    setAttempts((prev) => [a, ...prev].slice(0, 50));
  };

  return { attempts, addAttempt, clearAttempts };
}
