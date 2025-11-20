import { useEffect, useState } from "react";
import api from "../lib/api";

type Questao = {
  id: number;
  pergunta: string;
  respostaA: string;
  respostaB: string;
  respostaC: string;
  respostaD: string;
  correta: string;
};

export default function Simulado() {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get("/questions").then((res) => {
      setQuestoes(res.data);
    });
  }, []);

  if (questoes.length === 0) {
    return (
      <div className="p-10 text-center text-xl text-text">
        Carregando questões...
      </div>
    );
  }

  const q = questoes[index];

  return (
    <div className="p-10 text-text">
      <h1 className="text-3xl font-bold mb-6">Simulado</h1>

      <div className="bg-surface p-6 rounded-xl border border-border mb-6">
        <p className="text-xl font-semibold mb-4">{q.pergunta}</p>

        <div className="space-y-3">
          <button className="w-full p-3 bg-bg rounded border border-border">
            {q.respostaA}
          </button>
          <button className="w-full p-3 bg-bg rounded border border-border">
            {q.respostaB}
          </button>
          <button className="w-full p-3 bg-bg rounded border border-border">
            {q.respostaC}
          </button>
          <button className="w-full p-3 bg-bg rounded border border-border">
            {q.respostaD}
          </button>
        </div>
      </div>

      <button
        onClick={() => setIndex((prev) => (prev + 1) % questoes.length)}
        className="px-6 py-3 bg-primary hover:bg-primaryHover text-black rounded font-semibold"
      >
        Próxima
      </button>
    </div>
  );
}
