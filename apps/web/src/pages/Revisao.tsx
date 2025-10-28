import { useRevisionStore } from "../store/useRevisionStore";

export default function Revisao() {
  const items = useRevisionStore(s => s.items);
  const clear = useRevisionStore(s => s.clear);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Revisão</h2>
      <div className="text-sm text-muted-foreground">
        Questões enviadas dos simulados para você treinar depois.
      </div>

      <div className="border rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <span>Total para revisar: <strong>{items.length}</strong></span>
          {items.length > 0 && (
            <button onClick={clear} className="text-sm underline">Limpar</button>
          )}
        </div>
        <ul className="space-y-2 text-sm">
          {items.map((q) => (
            <li key={q.id} className="border rounded-lg p-2">
              {q.statement}
            </li>
          ))}
          {items.length === 0 && <li className="text-muted-foreground">Nenhuma questão por enquanto.</li>}
        </ul>
      </div>
    </div>
  );
}
