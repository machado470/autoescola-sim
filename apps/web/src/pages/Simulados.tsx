import { useEffect, useState } from "react";
import {
  listarSimulados,
  criarSimulado,
  type Simulado,
} from "../lib/simulados";

export default function Simulados() {
  const [simulados, setSimulados] = useState<Simulado[]>([]);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function carregar() {
    setCarregando(true);
    try {
      const data = await listarSimulados();
      setSimulados(data);
    } finally {
      setCarregando(false);
    }
  }

  async function handleCriar() {
    if (!novoTitulo.trim()) return;
    await criarSimulado(novoTitulo.trim());
    setNovoTitulo("");
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Simulados</h1>

      <div className="mb-4 flex gap-2">
        <input
          className="flex-1 rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Título do novo simulado"
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
        />
        <button
          onClick={handleCriar}
          className="px-4 py-2 rounded-md bg-emerald-500 text-emerald-950 text-sm font-medium hover:bg-emerald-400"
        >
          Criar
        </button>
      </div>

      {carregando && <p className="text-slate-400 text-sm">Carregando...</p>}

      {!carregando && simulados.length === 0 && (
        <p className="text-slate-500 text-sm">Nenhum simulado criado ainda.</p>
      )}

      <div className="mt-4 space-y-2">
        {simulados.map((s) => (
          <div
            key={s.id}
            className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 text-sm flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{s.titulo}</div>
              <div className="text-slate-500 text-xs">
                Criado em: {new Date(s.criadoEm).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
