import { useEffect, useState } from "react";
import { questions } from "../data/questions";

type Answer = { id: number; correct: boolean };

export function useQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [xp, setXp] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const currentQuestion = questions[current];
  const correctCount = answers.filter(a => a.correct).length;

  // 🔹 Restaurar progresso salvo
  useEffect(() => {
    const saved = localStorage.getItem("autosim_progress");
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
    }
  }, []);

  // 🔹 Salvar progresso sempre que XP mudar
  useEffect(() => {
    localStorage.setItem("autosim_progress", JSON.stringify({ xp }));
  }, [xp]);

  function answer(optionId: string) {
    if (finished) return;
    const correct = !!currentQuestion.options.find(o => o.id === optionId && o.correct);
    setAnswers(prev => [...prev, { id: currentQuestion.id, correct }]);
    if (correct) setXp(prev => prev + 80);

    if (current + 1 < total) {
      setCurrent(c => c + 1);
    } else {
      setFinished(true);
    }
  }

  function reset() {
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
  }

  return {
    currentQuestion,
    total,
    currentIndex: current + 1,
    answers,
    correctCount,
    xp,
    finished,
    answer,
    reset
  };
}
