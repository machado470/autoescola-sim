import { create } from "zustand";

export type Choice = { id: string; text: string };
export type Question = { id: string; statement: string; choices: Choice[]; correctId: string };

type ExamState = {
  questions: Question[];
  current: number;
  answers: Record<string, string | undefined>;
  startedAt?: number;
  durationSec: number;

  setQuestions: (q: Question[]) => void;
  select: (qid: string, cid: string) => void;
  next: () => void;
  prev: () => void;

  getResult: () => {
    total: number;
    hits: number;
    misses: number;
    percent: number;
    wrongQuestions: Question[];
  };
  reset: () => void;
};

export const useExamStore = create<ExamState>((set, get) => ({
  questions: [],
  current: 0,
  answers: {},
  durationSec: 1800,

  setQuestions: (q) => set({ questions: q, current: 0, answers: {}, startedAt: Date.now() }),
  select: (qid, cid) => set((s) => ({ answers: { ...s.answers, [qid]: cid } })),
  next: () => set((s) => ({ current: Math.min(s.current + 1, s.questions.length - 1) })),
  prev: () => set((s) => ({ current: Math.max(s.current - 1, 0) })),

  getResult: () => {
    const { questions, answers } = get();
    const total = questions.length;
    let hits = 0;
    const wrongQuestions: Question[] = [];
    questions.forEach((q) => {
      const sel = answers[q.id];
      if (sel === q.correctId) hits++;
      else wrongQuestions.push(q);
    });
    const misses = total - hits;
    const percent = total ? Math.round((hits / total) * 100) : 0;
    return { total, hits, misses, percent, wrongQuestions };
  },

  reset: () => set({ questions: [], current: 0, answers: {}, startedAt: undefined }),
}));
