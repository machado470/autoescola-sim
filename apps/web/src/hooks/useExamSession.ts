import { useEffect, useMemo, useRef, useState } from "react";
import { startSession, submitAnswer, getCurrent } from "../services/exam";
import type { Question } from "../components/QuestionCard";

export type ExamState = {
  sessionId: string;
  question: Question | null;
  index: number;
  total: number;
  remainingSec: number;
  loading: boolean;
  finished: boolean;
  error?: string;
};

export function useExamSession() {
  const [state, setState] = useState<ExamState>({
    sessionId: "",
    question: null,
    index: 0,
    total: 0,
    remainingSec: 0,
    loading: true,
    finished: false,
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const progress = useMemo(
    () => (state.total ? Math.min(100, Math.round(((state.index + 1) / state.total) * 100)) : 0),
    [state.index, state.total]
  );

  async function bootstrap() {
    try {
      setState((s) => ({ ...s, loading: true }));
      const s = await startSession();
      setState({ ...s, loading: false, finished: !!s.finished });
      tickSetup(s.remainingSec);
    } catch (e: any) {
      setState((s) => ({ ...s, loading: false, error: e?.message || "Falha ao iniciar sessão" }));
    }
  }

  function tickSetup(start: number) {
    if (timerRef.current) clearInterval(timerRef.current);
    setState((s) => ({ ...s, remainingSec: start }));
    timerRef.current = setInterval(() => {
      setState((s) => {
        if (s.remainingSec <= 1) {
          clearInterval(timerRef.current!);
          return { ...s, remainingSec: 0, finished: true };
        }
        return { ...s, remainingSec: s.remainingSec - 1 };
      });
    }, 1000);
  }

  async function select(choiceId: string) {
    if (!state.sessionId || !state.question) return;
    try {
      setState((s) => ({
        ...s,
        question: s.question ? { ...s.question, selectedChoiceId: choiceId } : s.question,
      }));
      const nxt = await submitAnswer(state.sessionId, state.question.id, choiceId);
      if (nxt.finished) {
        if (timerRef.current) clearInterval(timerRef.current);
        setState((s) => ({ ...s, ...nxt, finished: true }));
      } else {
        setState((s) => ({ ...s, ...nxt }));
      }
    } catch (e: any) {
      setState((s) => ({ ...s, error: e?.message || "Falha ao enviar resposta" }));
    }
  }

  async function refresh() {
    if (!state.sessionId) return;
    try {
      const cur = await getCurrent(state.sessionId);
      setState((s) => ({ ...s, ...cur }));
    } catch (e: any) {
      setState((s) => ({ ...s, error: e?.message || "Falha ao atualizar sessão" }));
    }
  }

  useEffect(() => {
    bootstrap();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { state, progress, select, refresh };
}
