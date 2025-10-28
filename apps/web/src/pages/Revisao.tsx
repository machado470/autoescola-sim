import { useRevisionStore } from "../store/useRevisionStore";
import { useExamStore } from "../store/useExamStore";
import { useNavigate } from "react-router-dom";

export default function Revisao() {
  const items = useRevisionStore((s) => s.items);
  const clear = useRevisionStore((s) => s.clear);
  const setQuestions = useExamStore((s) => s.setQuestions);
  const nav = useNavigate();

  const praticarErradas = () => {
    if (items.length === 0) return;
    setQuestions(items);
    nav("/simulado/fazendo");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Revisão</h2>
      <div className="text-sm text-muted-foreground">
        Questões erradas dos simulados para você revisar depois.
      </div>

      <div className="border rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <span>
            Total para revisar: <strong>{items.length}</strong>
          </span>
          {items.length > 0 && (
            <button onClick={clear} className="text-sm underline">
              Limpar
            </button>
          )}
        </div>

        {items.length > 0 && (
          <button
            onClick={praticarErradas}
            className="w-full border rounded-xl py-2 mb-3 bg-green-100 hover:bg-green-200 font-medium"
          >
            🧠 Praticar Erradas Agora
          </button>
        )}

        <ul className="space-y-2 text-sm">
          {items.map((q) => (
            <li key={q.id} className="border rounded-lg p-2">
              {q.statement}
            </li>
          ))}
          {items.length === 0 && (
            <li className="text-muted-foreground">
              Nenhuma questão por enquanto.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
