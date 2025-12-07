import { useThemeStore } from "../../store/theme";
import { useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../components/Card";
import { startQuiz } from "../../services/quiz";
import { useQuizStore } from "../../store/quiz";

export default function SimuladoStart() {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const phaseId = params.get("phase");
  const setQuiz = useQuizStore((s) => s.setQuiz);

  async function iniciar() {
    const token = localStorage.getItem("token")!;
    const data = await startQuiz(token, phaseId!);

    setQuiz(data.quizId, data.questions);

    navigate("/aluno/simulado/pergunta");
  }

  return (
    <div
      className={`min-h-screen p-4 flex flex-col justify-between pb-24 ${
        theme === "dark" ? "bg-[#111418]" : "bg-[#F7F9FC]"
      }`}
    >
      <div>
        <h1 className="text-2xl font-bold mb-2">Preparado?</h1>
        <p className="opacity-70 mb-6">
          Você vai iniciar o simulado da fase <strong>{phaseId}</strong>.
        </p>

        <Card className="p-4">
          <p className="text-sm opacity-80 mb-2">Formato do simulado:</p>
          <ul className="text-sm opacity-90 space-y-1">
            <li>• Perguntas reais da fase</li>
            <li>• Uma alternativa correta</li>
            <li>• Resultado ao final</li>
          </ul>
        </Card>
      </div>

      <button
        onClick={iniciar}
        className="w-full py-4 rounded-xl bg-[#2F80ED] text-white font-semibold text-lg"
      >
        Iniciar Simulado
      </button>
    </div>
  );
}
