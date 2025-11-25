import { useEffect, useState } from "react";

export default function Relatorios() {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setTimeout(() => setCarregando(false), 500); // placeholder
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-semibold mb-6">Relatórios</h1>

      {carregando && <p className="text-slate-400">Carregando...</p>}

      {!carregando && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
            <h2 className="text-lg font-semibold mb-2">Taxa média de acertos</h2>
            <p className="text-slate-400">Gráfico entra aqui…</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
            <h2 className="text-lg font-semibold mb-2">Simulados por dia</h2>
            <p className="text-slate-400">Outro gráfico entra aqui…</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
            <h2 className="text-lg font-semibold mb-2">Alunos ativos / inativos</h2>
            <p className="text-slate-400">Gráfico final…</p>
          </div>
        </div>
      )}
    </div>
  );
}
