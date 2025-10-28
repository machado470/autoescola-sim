import { Link, useNavigate } from "react-router-dom";
import { useExamStore } from "../store/useExamStore";
import QuestionCard from "../components/QuestionCard";

export default function SimuladoPlay() {
  const nav = useNavigate();
  const { questions, current, select, next, prev, answers } = useExamStore();

  if (!questions.length) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Nenhum simulado em andamento.</h2>
        <Link to="/simulado" className="text-sm underline">Voltar</Link>
      </div>
    );
  }

  const q = questions[current];
  const selected = answers[q.id];

  const finalizar = () => nav("/simulado/resultado");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <Link to="/simulado">← Configuração</Link>
        <button onClick={finalizar} className="underline">Finalizar</button>
      </div>

      <QuestionCard
        index={current}
        total={questions.length}
        statement={q.statement}
        choices={q.choices}
        selectedId={selected}
        onSelect={(id) => select(q.id, id)}
      />

      <div className="flex gap-2 pt-2">
        <button className="border rounded-xl px-3 py-2" onClick={prev}>Anterior</button>
        <button className="border rounded-xl px-3 py-2 ml-auto" onClick={next}>Próxima</button>
      </div>
    </div>
  );
}
