import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-2xl font-bold mt-10">AutoEscola-Sim</h1>

      <div className="space-y-3">
        <Link
          to="/treino"
          className="block border rounded-xl py-3 bg-primary/10 hover:bg-primary/20"
        >
          Treino Rápido
        </Link>

        <Link
          to="/simulado"
          className="block border rounded-xl py-3 bg-accent/10 hover:bg-accent/20"
        >
          Fazer Simulado
        </Link>

        <Link
          to="/revisao"
          className="block border rounded-xl py-3 bg-secondary/10 hover:bg-secondary/20"
        >
          Revisar Questões
        </Link>

        <Link
          to="/progresso"
          className="block border rounded-xl py-3 bg-green-200/30 hover:bg-green-300/40"
        >
          Ver Progresso
        </Link>
      </div>
    </div>
  );
}
