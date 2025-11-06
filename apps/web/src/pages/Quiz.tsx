import { useParams } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../ui/ProgressBar";
import StopSign from "../icons/StopSign";
import { useProgressStore } from "../store/progress";

type Question = { id: string; image?: React.ReactNode; text: string; options: string[]; answer: number; };

const sample: Question[] = [{
  id: "q1",
  image: <StopSign size={140}/>,
  text: "O que esse sinal indica?",
  options: ["Parada obrigatória", "Travessia de pedestres", "Siga em frente"],
  answer: 0
}];

export default function Quiz() {
  const { slug = "sinalizacao" } = useParams();
  const { incXP, setProgress, progress } = useProgressStore();
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = sample[i]; const total = sample.length;

  function submit(optIndex: number) {
    setSelected(optIndex);
    const right = optIndex === q.answer;

    if (right) {
      setScore(s => s + 1);
      incXP(20);
      const current = progress[slug as any] ?? 0;
      setProgress(slug as any, Math.min(100, current + Math.round(100 / total)));
    }

    setTimeout(() => {
      setSelected(null);
      if (i + 1 < total) setI(i + 1);
      else alert(`Quiz concluído (${score + (right ? 1 : 0)}/${total}) — ${slug}`);
    }, 500);
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <header className="flex items-center gap-3">
        <div className="text-3xl">🟧</div>
        <h2 className="text-2xl font-extrabold">Quiz</h2>
      </header>

      <div>
        <div className="text-slate-600 mb-2">Pergunta {i + 1} de {total}</div>
        <ProgressBar value={Math.round(((i + 1) / total) * 100)} />
      </div>

      <div className="flex justify-center">{q.image}</div>
      <h3 className="text-xl font-bold text-center">{q.text}</h3>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          const isSel = selected === idx;
          const isRight = selected !== null && idx === q.answer;
          const state =
            isSel && isRight ? "border-green-500 bg-green-50" :
            isSel && !isRight ? "border-red-500 bg-red-50" :
            "border-slate-200 bg-white";
          return (
            <button key={idx} onClick={() => submit(idx)} className={`w-full border rounded-2xl px-4 py-3 text-left transition ${state}`}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
