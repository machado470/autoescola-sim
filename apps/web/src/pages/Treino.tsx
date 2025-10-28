import { Link } from "react-router-dom";
export default function Treino() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Treino</h2>
      <p className="text-sm text-muted-foreground">Modo estudo com feedback imediato.</p>
      <Link to="/treino/jogar" className="border rounded-xl px-3 py-2 inline-block">
        Iniciar Treino
      </Link>
    </div>
  );
}
