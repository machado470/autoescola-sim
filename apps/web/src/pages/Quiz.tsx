import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import ProgressBar from "../ui/ProgressBar";
import { useProgressStore } from "../store/progress";
import FloatXp from "../ui/FloatXp";
import { beep } from "../ui/sfx";

type Question = { id: string; image?: string; text: string; options: string[]; answer: number; };

const PER_QUESTION_TIME = 20; // segundos
const XP_PER_HIT = 20;

export default function Quiz() {
  const { slug = "sinalizacao" } = useParams();
  const nav = useNavigate();
  const { incXP, setProgress, progress } = useProgressStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PER_QUESTION_TIME);
  const [showXP, setShowXP] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    import(`../questions/${slug}.json`)
      .then((mod) => setQuestions(mod.default))
      .catch(() => setQuestions([]));
  }, [slug]);

  useEffect(() => {
    if (!questions.length) return;
    setTimeLeft(PER_QUESTION_TIME);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(timerRef.current!);
          handleAnswer(-1);
          return PER_QUESTION_TIME;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, questions.length]);

  const q = questions[i];
  const total = questions.length;
  const quizPct = useMemo(() => Math.round(((i + 1) / Math.max(1,total)) * 100), [i,total]);
  const timePct = useMemo(() => Math.round((timeLeft / PER_QUESTION_TIME) * 100), [timeLeft]);

  if (!questions.length) return <p className="p-4 text-center">Carregando perguntas...</p>;

  function handleAnswer(optIndex: number) {
    if (selected !== null) return;

    const right = optIndex === q.answer;
    setSelected(optIndex);

    if (right) {
      setScore((s) => s + 1);
      incXP(XP_PER_HIT);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 900);
      const current = progress[slug as any] ?? 0;
      setProgress(slug as any, Math.min(100, current + Math.round(100 / total)));
      beep(true);
    } else {
      beep(false);
    }

    setTimeout(() => {
      setSelected(null);
      if (i + 1 < total) setI(i + 1);
      else nav("/result", { state: { correct: score + (right ? 1 : 0), total, gained: (score + (right ? 1 : 0)) * XP_PER_HIT } });
    }, 700);
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <FloatXp show={showXP} amount={XP_PER_HIT} />

      <header className="flex items-center gap-3">
        <div className="text-3xl">🟧</div>
        <h2 className="text-2xl font-extrabold capitalize">{slug}</h2>
      </header>

      <ProgressBar value={quizPct} label={`Pergunta ${i + 1} de ${total}`} />
      <div className="mt-2">
        <ProgressBar value={timePct} animated label={`Tempo: ${timeLeft}s`} />
      </div>

      <div className="flex justify-center text-6xl mt-2">{q.image}</div>
      <h3 className="text-xl font-bold text-center">{q.text}</h3>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          const isSel = selected === idx;
          const isRight = selected !== null && idx === q.answer;
          const isWrongSel = selected !== null && isSel && !isRight;

          let state = "border-slate-200 bg-white";
          if (isRight && selected !== null) state = "border-green-500 bg-green-50";
          if (isWrongSel) state = "border-red-500 bg-red-50";

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full border rounded-2xl px-4 py-3 text-left transition ${state} ${isWrongSel ? "animate-shake" : ""}`}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
