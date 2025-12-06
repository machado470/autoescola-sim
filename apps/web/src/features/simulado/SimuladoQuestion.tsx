import { useThemeStore } from "../../store/theme";
import Card from "../../components/Card";
import { useQuizStore } from "../../store/quiz";
import { useNavigate } from "react-router-dom";

export default function SimuladoQuestion() {
  const { theme } = useThemeStore();
  const { questions, current, answer, next, quizId } = useQuizStore();
  const navigate = useNavigate();

  const q = questions[current];

  if (!q) {
    return (
      <div className="p-6">
        <p>Nenhuma pergunta carregada.</p>
      </div>
    );
  }

  function selecionar(alt: string) {
    answer(q.id, alt);

    if (current + 1 >= questions.length) {
      navigate("/aluno/simulado/resultado");
    } else {
      next();
    }
  }

  return (
    <div
      className={`min-h-screen p-4 pb-24 ${
        theme === "dark" ? "bg-[#111418]" : "bg-[#F7F9FC]"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">
        Pergunta {current + 1}/{questions.length}
      </h2>

      <Card className="p-4 mb-6">
        <p className="text-lg mb-4">{q.statement}</p>

        {q.alternatives.map((alt, i) => (
          <button
            key={i}
            onClick={() => selecionar(alt)}
            className="w-full mb-2 p-3 rounded-xl bg-gray-200 dark:bg-[#2A2F33] text-left"
          >
            {alt}
          </button>
        ))}
      </Card>
    </div>
  );
}
