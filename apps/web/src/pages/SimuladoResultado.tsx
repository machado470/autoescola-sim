import { Link, useNavigate } from "react-router-dom";
import { useExamStore } from "../store/useExamStore";
import { useRevisionStore } from "../store/useRevisionStore";
import { useProgressStore } from "../store/useProgressStore";

export default function SimuladoResultado() {
  const nav = useNavigate();
  const { getResult, reset } = useExamStore();
  const addRevision = useRevisionStore(s => s.addMany);
  const addXp = useProgressStore(s => s.addXp);
  const touchStreak = useProgressStore(s => s.touchStreak);

  const r = getResult();

  const enviarParaRevisao = () => {
    addRevision(r.wrongQuestions);
  };

  const concluir = () => {
    // XP bônus por desempenho
    if (r.percent >= 80) addXp(80);
    else if (r.percent >= 60) addXp(50);
    else addXp(20);
    touchStreak();
    reset();
    nav("/simulado");
  };

  if (r.total === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Sem resultado</h2>
        <Link to="/simulado" className="text-sm underline">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Resultado do Simulado</h2>

      <div className="grid gap-2">
        <div className="border rounded-xl p-3 flex justify-between">
          <span>Total</span><strong>{r.total}</strong>
        </div>
        <div className="border rounded-xl p-3 flex justify-between">
          <span>Acertos</span><strong>{r.hits}</strong>
        </div>
        <div className="border rounded-xl p-3 flex justify-between">
          <span>Erros</span><strong>{r.misses}</strong>
        </div>
        <div className="border rounded-xl p-3 flex justify-between">
          <span>Aproveitamento</span><strong>{r.percent}%</strong>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={enviarParaRevisao} className="border rounded-xl px-3 py-2">
          Enviar erradas para Revisão
        </button>
        <button onClick={concluir} className="border rounded-xl px-3 py-2">
          Concluir
        </button>
      </div>

      {r.wrongQuestions.length > 0 && (
        <div className="pt-2">
          <h3 className="font-medium mb-2">Erradas ({r.wrongQuestions.length})</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {r.wrongQuestions.map(q => (
              <li key={q.id}>{q.statement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
