import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav";

export default function StudentHome() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen pb-20 p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold dark:text-white mb-6">
        Bem-vindo(a)!
      </h1>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => nav("/aluno/dashboard")}
          className="bg-white dark:bg-gray-800 shadow p-4 rounded-xl text-left"
        >
          <h2 className="text-xl font-semibold dark:text-white">📘 Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Seu progresso.</p>
        </button>

        <button
          onClick={() => nav("/aluno/simulado")}
          className="bg-white dark:bg-gray-800 shadow p-4 rounded-xl text-left"
        >
          <h2 className="text-xl font-semibold dark:text-white">
            ❓ Simulado Teórico
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Treine antes da prova.
          </p>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
