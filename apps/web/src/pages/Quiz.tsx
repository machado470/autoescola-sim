import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getRandomByCategory } from '../lib/api';
import type { Question } from '../lib/api';
import { saveAttempt } from '../hooks/useLocalProgress';

export default function QuizPage() {
  const nav = useNavigate();
  const loc = useLocation();
const { slug } = useParams();
const catMap = { sinalizacao: 'Sinalização', 'direcao-defensiva': 'Direção Defensiva', mecanica: 'Mecânica' } as const;
const category = (params.get('cat') as Question['category']) ?? (slug ? catMap[slug as keyof typeof catMap] : undefined);

  const [loading, setLoading] = useState(true);
  const [qs, setQs] = useState<Question[]>([]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<number,string>>({});
  const [t0] = useState(Date.now());

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
    console.debug('quiz> category:', category);
    console.debug('quiz> category:', category);
        const { questions } = await getRandomByCategory(category);
      // fallback 1: tentar sem acento
      if ((questions?.length ?? 0) === 0 && category) {
        const noAccent = category.normalize('NFD').replace(/p{Diacritic}/gu, '');
        try {
          const fb1 = await getRandomByCategory(noAccent as any);
          if ((fb1.questions?.length ?? 0) > 0) {
            setQs(fb1.questions);
            setLoading(false);
            return;
          }
        } catch {}
      }
      // fallback 2: sem categoria
      if ((questions?.length ?? 0) === 0) {
        const fb2 = await getRandomByCategory(undefined);
        setQs(fb2.questions ?? []);
        setLoading(false);
        return;
      }
        setQs(questions);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  const q = qs[i];
  const progress = useMemo(() => ({
    total: qs.length, current: i+1, done: Object.keys(answers).length
  }), [qs.length, i, answers]);

  function select(altId: string) {
    if (!q) return;
    if (answers[q.id]) return; // trava dupla resposta
    setAnswers(prev => ({ ...prev, [q.id]: altId }));
  }

  function next(){ setI(s => Math.min(s+1, Math.max(0, qs.length-1))); }
  function prev(){ setI(s => Math.max(s-1, 0)); }

  function finish() {
    // score
    let correct = 0;
    for (const quest of qs) {
      const sel = answers[quest.id];
      const hit = quest.alternatives.find(a => a.id === sel)?.isCorrect === true;
      if (hit) correct++;
    }
    const attempt = {
      id: crypto.randomUUID(),
      category: (qs[0]?.category ?? (category as any)) || 'Sinalização',
      correct,
      total: qs.length || 50,
      startedAt: new Date(t0).toISOString(),
      finishedAt: new Date().toISOString(),
    };
    saveAttempt(attempt);
    nav('/result', { state: attempt });
  }

  if (loading) return <div className="p-8">Carregando questões…</div>;
  if (!qs.length) return <div className="p-8">Sem questões.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Simulado — {qs[0]?.category}</h1>
          <p className="text-sm text-gray-500">{progress.current}/{progress.total} • respondidas {progress.done}</p>
        </div>
        <button onClick={finish} className="px-4 py-2 rounded bg-blue-600 text-white">Finalizar</button>
      </header>

      <article>
        <h2 className="text-lg font-medium mb-3">{q.text}</h2>
        <ul className="space-y-2">
          {q.alternatives.map(a => {
            const selected = answers[q.id] === a.id;
            return (
              <li key={a.id}>
                <button
                  onClick={() => select(a.id)}
                  disabled={Boolean(answers[q.id])}
                  className={`w-full text-left p-3 rounded border ${selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'} disabled:opacity-70`}
                >
                  {a.text}
                </button>
              </li>
            );
          })}
        </ul>
      </article>

      <footer className="flex gap-3">
        <button onClick={prev} className="px-3 py-2 rounded border">Anterior</button>
        <button onClick={next} className="px-3 py-2 rounded border">Próxima</button>
      </footer>
    </div>
  );
}
