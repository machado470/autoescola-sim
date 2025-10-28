import { useEffect, useMemo, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { useProgressStore } from "../store/useProgressStore";
import { Link } from "react-router-dom";

type Choice = { id: string; text: string };
type Q = { id: string; statement: string; choices: Choice[]; correctId: string };

export default function TreinoPlay() {
  const [questions, setQuestions] = useState<Q[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [showFeedback, setShowFeedback] = useState(false);

  const addXp = useProgressStore(s => s.addXp);
  const touchStreak = useProgressStore(s => s.touchStreak);

  useEffect(() => {
    setQuestions(mockQuestions(10));
  }, []);

  const q = questions[idx];
  const total = questions.length;

  const handleSelect = (id: string) => {
    if (showFeedback) return;
    setSelected(id);
    setShowFeedback(true);
    // feedback + XP
    if (id === q.correctId) {
      addXp(10);      // +10 por acerto
      touchStreak();  // atualiza streak do dia
    }
    // avança automático após 800ms
    setTimeout(() => {
      setSelected(undefined);
      setShowFeedback(false);
      setIdx((i) => Math.min(i + 1, total - 1));
    }, 800);
  };

  if (!q) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Treino concluído ✅</h2>
        <p className="text-sm text-muted-foreground">Volte ao Treino para iniciar outro deck.</p>
        <Link to="/treino" className="underline text-sm">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <Link to="/treino">← Voltar</Link>
        <span>{idx + 1} / {total}</span>
      </div>

      <QuestionCard
        index={idx}
        total={total}
        statement={q.statement}
        choices={q.choices}
        selectedId={selected}
        showFeedback={showFeedback}
        correctId={q.correctId}
        onSelect={handleSelect}
      />
    </div>
  );
}

function mockQuestions(n: number): Q[] {
  return Array.from({ length: n }).map((_, i) => ({
    id: `t${i}`,
    statement: `No treino: o que significa a placa R-${(i % 5) + 1}?`,
    choices: [
      { id: "a", text: "Parada obrigatória" },
      { id: "b", text: "Preferência" },
      { id: "c", text: "Velocidade mínima" },
      { id: "d", text: "Sentido obrigatório" },
    ],
    correctId: "a",
  }));
}
