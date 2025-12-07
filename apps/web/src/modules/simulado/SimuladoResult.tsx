import { useThemeStore } from "../../store/theme";
import { useQuizStore } from "../../store/quiz";
import { finishQuiz } from "../../services/quiz";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

export default function SimuladoResult() {
  const { theme } = useThemeStore();
  const { quizId, answers, questions, reset } = useQuizStore();
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function send() {
      const token = localStorage.getItem("token")!;
      const res = await finishQuiz(token, quizId!, answers);
      setResult(res);
    }
    send();
  }, []);

  if (!result)
    return (
      <div className="p-6 text-center">
        <p>Carregando resultado...</p>
      </div>
    );

  return (
    <div
      className={`min-h-screen p-4 pb-24 text-center ${
        theme === "dark" ? "bg-[#111418] text-gray-100" : "bg-[#F7F9FC] text-gray-900"
      }`}
    >
      <img src="/logo-cone.png" className="w-20 mx-auto mb-4" />

      <h2 className="text-2xl font-bold mb-2">Resultado</h2>

      <Card className="p-4 mb-6">
        <p className="text-lg font-semibold">
          Acertos: {result.score}/{result.total}
        </p>
        <p className="opacity-70 text-sm mt-1">
          Aproveitamento: {result.percentage}%
        </p>
      </Card>

      <button
        onClick={() => {
          reset();
          navigate("/aluno");
        }}
        className="w-full py-4 rounded-xl bg-[#2F80ED] text-white font-semibold text-lg"
      >
        Voltar ao início
      </button>
    </div>
  );
}
