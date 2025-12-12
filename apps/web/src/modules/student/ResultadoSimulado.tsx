import { useLocation } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav";

export default function ResultadoSimulado() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        Resultado inválido.
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 p-6 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Resultado do Simulado</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg mb-6">
        <p className="text-xl font-semibold mb-2">Acertos:</p>
        <p className="text-2xl font-bold text-green-500">{state.acertos}</p>

        <p className="text-xl font-semibold mt-4 mb-2">Erros:</p>
        <p className="text-2xl font-bold text-red-500">{state.erros}</p>

        <p className="text-xl font-semibold mt-4 mb-2">Total:</p>
        <p className="text-lg">{state.total}</p>
      </div>

      <button
        onClick={() => (window.location.href = "/aluno/simulado")}
        className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold"
      >
        Refazer simulado
      </button>

      <BottomNav />
    </div>
  );
}
