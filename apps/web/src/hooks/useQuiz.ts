import { useState } from "react";
import { questions } from "../data/questions";

export function useQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ id: number; correct: boolean }[]>([]);
  const [xp, setXp] = useState(0);

  const currentQuestion = questions[current];
  const total = questions.length;

  function answer(optionId: string) {
    const correct = currentQuestion.options.find(o => o.id === optionId)?.correct || false;
    setAnswers(prev => [...prev, { id: currentQuestion.id, correct }]);
    if (correct) setXp(prev => prev + 80);
    if (current + 1 < total) setCurrent(current + 1);
  }

  return {
    currentQuestion,
    total,
    currentIndex: current + 1,
    finished: current + 1 > total,
    answers,
    xp,
    answer
  };
}
