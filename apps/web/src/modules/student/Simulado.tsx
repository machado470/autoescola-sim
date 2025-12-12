import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomNav from "../../components/ui/BottomNav";

export default function Simulado() {
  const nav = useNavigate();

  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 1. INICIAR SIMULACAO
  async function startSimulation() {
    const res = await axios.post(
      "http://localhost:3001/simulations/start",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSimulationId(res.data.id);
  }

  // 2. CARREGAR PERGUNTAS E INICIAR SIMULAÇÃO
  useEffect(() => {
    async function load() {
      await startSimulation();

      const res = await axios.get("http://localhost:3001/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setQuestions(res.data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading || !simulationId)
    return (
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        Carregando simulado...
      </div>
    );

  const q = questions[current];

  // 3. REGISTRAR RESPOSTA
  async function responder(option: string) {
    setSelected(option);

    await axios.post(
      "http://localhost:3001/simulations/answer",
      {
        simulationId,
        questionId: q.id,
        selected: option,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTimeout(async () => {
      // Última pergunta → finaliza
      if (current + 1 >= questions.length) {
        const finish = await axios.post(
          "http://localhost:3001/simulations/finish",
          { simulationId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        nav("/aluno/simulado/resultado", {
          state: finish.data,
        });

        return;
      }

      // Próxima pergunta
      setSelected(null);
      setCurrent((p) => p + 1);
    }, 800);
  }

  return (
    <div className="min-h-screen pb-20 p-6 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Simulado Teórico</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg mb-4">
        <h2 className="text-lg font-semibold mb-3">{q.text}</h2>

        <div className="flex flex-col gap-3">
          {q.options?.map((op: any) => (
            <button
              key={op.id}
              onClick={() => responder(op.text)}
              className={`p-3 rounded-md border text-left transition ${
                selected === op.text
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {op.text}
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
