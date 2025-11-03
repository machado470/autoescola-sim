import Result from "./Result";
import { useQuiz } from "../../hooks/useQuiz";

export default function SimuladoPage() {
  const { currentQuestion, currentIndex, total, answer, finished, xp, correctCount, reset } = useQuiz();

  if (finished) {
    return <Result xp={xp} correct={correctCount} total={total} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-sm text-gray-500 mb-4">
        Pergunta {currentIndex} de {total}
      </p>

      {currentQuestion?.image && (
        <img src={currentQuestion.image} alt="Sinal" className="w-40 mb-6" />
      )}

      <h2 className="text-xl font-bold mb-6 text-center">
        {currentQuestion?.question}
      </h2>

      <div className="grid gap-3 w-64">
        {currentQuestion?.options.map(opt => (
          <button
            key={opt.id}
            onClick={() => answer(opt.id)}
            className="bg-white border rounded-xl py-2 hover:bg-blue-100 transition"
          >
            {opt.text}
          </button>
        ))}
      </div>

      <button
        onClick={reset}
        className="mt-8 text-xs text-gray-400 underline hover:text-gray-600"
        title="Reiniciar simulado"
      >
        Reiniciar
      </button>
    </div>
  );
}
