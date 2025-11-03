import Result from "./Result";
import { useQuiz } from "../../hooks/useQuiz";
import { useState } from "react";

export default function SimuladoPage() {
  const { currentQuestion, currentIndex, total, answer, finished, xp, correctCount, reset } = useQuiz();

  // Feedback visual local
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [locking, setLocking] = useState(false); // evita double click

  if (finished) {
    return <Result xp={xp} correct={correctCount} total={total} />;
  }

  if (!currentQuestion) return null;

  function onChoose(optionId: string) {
    if (locking) return;
    setLocking(true);
    setClickedId(optionId);

    const correct = !!currentQuestion.options.find(o => o.id === optionId && o.correct);
    setIsCorrect(correct);

    // aguarda 700ms para mostrar cor e só então avança
    setTimeout(() => {
      answer(optionId);
      setClickedId(null);
      setIsCorrect(null);
      setLocking(false);
    }, 700);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <p className="text-sm text-gray-500 mb-4">
        Pergunta {currentIndex} de {total}
      </p>

      {currentQuestion.image && (
        <img src={currentQuestion.image} alt="Sinal" className="w-40 mb-6 drop-shadow-sm" />
      )}

      <h2 className="text-xl font-bold mb-6 text-center">
        {currentQuestion.question}
      </h2>

      <div className="grid gap-3 w-full max-w-md">
        {currentQuestion.options.map(opt => {
          const isClicked = clickedId === opt.id;
          const bg =
            isClicked && isCorrect === true ? "bg-green-100 border-green-300" :
            isClicked && isCorrect === false ? "bg-red-100 border-red-300" :
            "bg-white border-gray-200";
          const ring =
            isClicked && isCorrect === true ? "ring-2 ring-green-300" :
            isClicked && isCorrect === false ? "ring-2 ring-red-300" :
            "ring-0";

          return (
            <button
              key={opt.id}
              onClick={() => onChoose(opt.id)}
              disabled={locking}
              className={`border rounded-xl py-3 px-4 text-left transition-all ${bg} ${ring} hover:bg-blue-50`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      <button
        onClick={reset}
        disabled={locking}
        className="mt-8 text-xs text-gray-400 underline hover:text-gray-600 disabled:opacity-50"
        title="Reiniciar simulado"
      >
        Reiniciar
      </button>
    </div>
  );
}
