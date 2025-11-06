import { useParams, Link } from "react-router-dom";
import ProgressBar from "../ui/ProgressBar";
import { useProgressStore } from "../store/progress";
import StopSign from "../icons/StopSign";
import YieldSign from "../icons/YieldSign";

const lessons = [
  { code: "R-1", title: "Parada Obrigatória", icon: <StopSign size={84}/> },
  { code: "R-2", title: "Dê a Preferência", icon: <YieldSign size={84}/> }
];

export default function Category() {
  const { slug = "sinalizacao" } = useParams();
  const { progress } = useProgressStore();
  const pct = progress[slug as keyof typeof progress] ?? 0;

  return (
    <div className="mx-auto max-w-md">
      <header className="mb-4">
        <button onClick={() => history.back()} className="text-brand-blue">&larr; Voltar</button>
        <h2 className="text-2xl font-extrabold mt-2 capitalize">{slug.replace("-", " ")}</h2>
        <div className="mt-2">
          <div className="text-sm text-slate-600 mb-1">{pct}% concluído</div>
          <ProgressBar value={pct} />
        </div>
      </header>

      <nav className="flex gap-6 border-b mb-4 text-slate-600">
        <button className="pb-2 border-b-2 border-brand-blue font-semibold text-slate-900">Aulas</button>
        <Link to={`/quiz/${slug}`} className="pb-2 hover:text-slate-900">Quiz</Link>
        <button className="pb-2 hover:text-slate-900">Progresso</button>
      </nav>

      <div className="grid grid-cols-2 gap-3">
        {lessons.map((l) => (
          <div key={l.code} className="card p-3 text-center">
            <div className="mb-2 flex justify-center">{l.icon}</div>
            <div className="text-sm font-semibold">{l.code}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 card p-4 flex gap-3 items-start">
        <div className="text-4xl">🟧</div>
        <p className="text-slate-700">Muita atenção com as placas vermelhas, elas indicam proibições.</p>
      </div>

      <Link to={`/quiz/${slug}`} className="mt-4 btn btn-primary w-full inline-flex justify-center">Iniciar Quiz</Link>
    </div>
  );
}
