import { useLocation, Link } from 'react-router-dom';
import { useLocalProgress } from '../hooks/useLocalProgress';

export default function ResultPage() {
  const loc = useLocation() as any;
  const attempt = loc.state;
  const { attempts } = useLocalProgress();
  const a = attempt ?? attempts[0];

  if (!a) return <div className="p-8">Sem resultado recente.</div>;

  const pct = Math.round((a.correct / a.total) * 100);

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Resultado</h1>
      <div className="p-4 rounded border">
        <p><b>Categoria:</b> {a.category}</p>
        <p><b>Acertos:</b> {a.correct} / {a.total} ({pct}%)</p>
        <p><b>Início:</b> {new Date(a.startedAt).toLocaleString()}</p>
        {a.finishedAt && <p><b>Fim:</b> {new Date(a.finishedAt).toLocaleString()}</p>}
      </div>
      <div className="flex gap-3">
        <Link to="/home" className="px-4 py-2 rounded border">Voltar</Link>
        <Link to={`/quiz?cat=${encodeURIComponent(a.category)}`} className="px-4 py-2 rounded bg-blue-600 text-white">Refazer</Link>
      </div>
    </div>
  );
}
