import { Link } from "react-router-dom";

interface ResultProps {
  xp: number;
  correct: number;
  total: number;
}

export default function Result({ xp, correct, total }: ResultProps) {
  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Resultado do Simulado 🎯</h1>

      <div className="bg-white rounded-2xl shadow-md p-8 text-center w-full max-w-md">
        <p className="text-lg mb-3">
          Acertos: <strong>{correct}</strong> / {total}
        </p>
        <p className="text-lg mb-3">
          Desempenho: <strong>{percentage}%</strong>
        </p>
        <p className="text-xl font-semibold text-blue-600 mb-6">
          XP ganho: {xp}
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/simulado"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Refazer Simulado
          </Link>
          <Link
            to="/"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Voltar à Home
          </Link>
        </div>
      </div>
    </div>
  );
}
