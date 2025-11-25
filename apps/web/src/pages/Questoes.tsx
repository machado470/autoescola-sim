import { useEffect, useState } from "react";
import {
  listarQuestoes,
  criarQuestao,
  type Questao,
} from "../lib/questoes";

export default function Questoes() {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [enunciado, setEnunciado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function carregar() {
    setCarregando(true);
    try {
      const data = await listarQuestoes();
      setQuestoes(data);
    } finally {
      setCarregando(false);
    }
  }

  async function handleCriar() {
    if (!enunciado.trim() || !categoria.trim()) return;
    await criarQuestao(enunciado.trim(), categoria.trim());
    setEnunciado("");
    setCategoria("");
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Questões</h1>

      <div className="mb-4 grid gap-2 md:grid-cols-[2fr,1fr,auto]">
        <input
          className="rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Enunciado da questão"
          value={enunciado}
          onChange={(e) => setEnunciado(e.target.value)}
        />
        <input
          className="rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <button
          onClick={handleCriar}
          className="px-4 py-2 rounded-md bg-emerald-500 text-emerald-950 text-sm font-medium hover:bg-emerald-400"
        >
          Criar
        </button>
      </div>

      {carregando && <p className="text-slate-400 text-sm">Carregando...</p>}

      <div className="mt-4 space-y-2">
        {questoes.map((q) => (
          <div
            key={q.id}
            className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 text-sm"
          >
            <div className="font-medium mb-1">{q.enunciado}</div>
            <div className="text-xs text-slate-500">
              Categoria: {q.categoria} &middot; Criada em:{" "}
              {new Date(q.criadaEm).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
