import React, { useEffect, useMemo, useState } from 'react';
import Stop from '../assets/ui/icons/stop.svg';
import { ProgressBar } from '../components/ui/ProgressBar';
import { QuizOption } from '../components/ui/QuizOption';
import { fetchQuestions } from '../services/exam';

type Choice = { id: string; text: string; isCorrect: boolean; };
type Question = { id: string; statement: string; imageUrl?: string | null; tags: string[]; choices: Choice[]; };

export default function Simulado() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => {
    (async () => {
      const data = await fetchQuestions();
      // fallback exemplo se API vier vazia
      if (!data?.length) {
        setQuestions([{
          id: 'q1',
          statement: 'O que esse sinal indica?',
          imageUrl: undefined,
          tags: ['EASY','comportamento','trânsito'],
          choices: [
            { id: 'c1', text: 'Parada obrigatória', isCorrect: true },
            { id: 'c2', text: 'Travessia de pedestres', isCorrect: false },
            { id: 'c3', text: 'Siga em frente', isCorrect: false }
          ]
        }]);
      } else {
        setQuestions(data);
      }
    })();
  }, []);

  const q = questions[idx];
  const total = questions.length || 1;
  const progress = useMemo(() => Math.round(((idx) / total) * 100), [idx, total]);

  function handleSelect(choice: Choice) {
    if (selected) return;
    setSelected(choice.id);
    const ok = choice.isCorrect;
    setStatus(ok ? 'correct' : 'wrong');
    // avança após pequeno delay
    setTimeout(() => {
      setSelected(null);
      setStatus('idle');
      setIdx((p) => (p + 1 < total ? p + 1 : 0));
    }, 900);
  }

  return (
    <div className="container-app py-8 md:py-10">
      <div className="mb-6">
        <div className="text-sm font-semibold text-blue-700">Pergunta {Math.min(idx+1,total)} de {total}</div>
        <ProgressBar value={progress} className="mt-2" />
      </div>

      <div className="grid place-items-center my-6">
        <img src={q?.imageUrl || Stop} alt="Sinal" className="w-40 h-40 md:w-52 md:h-52" />
      </div>

      <h1 className="h2 text-center mb-6">{
        q?.statement || 'O que esse sinal indica?'
      }</h1>

      {/* tags */}
      <div className="flex gap-2 justify-center mb-6">
        {(q?.tags ?? []).map(t => (
          <span key={t} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300">{t}</span>
        ))}
      </div>

      <div className="space-y-3">
        {(q?.choices ?? []).map((c) => {
          let state: 'idle' | 'correct' | 'wrong' | 'disabled' = 'idle';
          if (selected) {
            if (c.id === selected) state = status;
            else state = 'disabled';
          }
          return (
            <QuizOption key={c.id} text={c.text} state={state} onClick={() => handleSelect(c)} />
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <span className="subtle">Pergunta {Math.min(idx+1,total)} de {total}</span>
      </div>
    </div>
  );
}
