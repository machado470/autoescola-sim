import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../store/useExamStore";

export default function Simulado() {
  const nav = useNavigate();
  const setQuestions = useExamStore(s => s.setQuestions);
  const [qtd, setQtd] = useState(30);

  function start() {
    setQuestions(mockQuestions(qtd));
    nav("/simulado/fazendo");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Simulado</h2>

      <label className="text-sm">Quantidade de questões</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={10}
          max={40}
          value={qtd}
          onChange={(e) => setQtd(Math.max(10, Math.min(40, Number(e.target.value) || 30)))}
          className="border rounded-xl px-3 py-2 w-24"
        />
        <span className="text-xs text-muted-foreground">mín: 10 • máx: 40</span>
      </div>

      <button onClick={start} className="border rounded-xl px-4 py-2 font-medium">
        Iniciar Simulado
      </button>
    </div>
  );
}

// Mock local (trocar por API real no backend)
function mockQuestions(n: number) {
  return Array.from({ length: n }).map((_, i) => ({
    id: `s${i}`,
    statement: `No simulado: o que significa a placa R-${(i % 5) + 1}?`,
    choices: [
      { id: "a", text: "Parada obrigatória" },
      { id: "b", text: "Preferência" },
      { id: "c", text: "Velocidade mínima" },
      { id: "d", text: "Sentido obrigatório" },
    ],
    correctId: "a",
  }));
}
