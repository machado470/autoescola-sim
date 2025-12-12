import { useEffect, useState } from "react";
import axios from "axios";
import BottomNav from "../../components/ui/BottomNav";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StudentDashboard() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("http://localhost:3001/simulations/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ordena por data ASC para o gráfico
        const ordered = res.data.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        setHistory(ordered);
      } catch (e) {
        console.error("Erro carregando histórico:", e);
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        Carregando...
      </div>
    );

  // Estatísticas gerais
  const totalSimulados = history.length;
  const media =
    totalSimulados > 0
      ? Math.round(history.reduce((acc, h) => acc + h.percentage, 0) / totalSimulados)
      : 0;

  const melhor = totalSimulados > 0 ? Math.max(...history.map((h) => h.percentage)) : 0;

  return (
    <div className="min-h-screen p-6 pb-20 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Seu Progresso</h1>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Total de Simulados</p>
          <p className="text-3xl font-bold text-blue-600">{totalSimulados}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Média Geral</p>
          <p className="text-3xl font-bold text-green-600">{media}%</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Melhor Desempenho</p>
          <p className="text-3xl font-bold text-purple-600">{melhor}%</p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Evolução de Acertos</h2>

        {history.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Nenhum simulado realizado.</p>
        ) : (
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={history}>
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis
                  dataKey="createdAt"
                  tickFormatter={(v) =>
                    new Date(v).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
                  }
                />
                <YAxis />
                <Tooltip
                  formatter={(value: any) => `${value}%`}
                  labelFormatter={(v) =>
                    `Data: ${new Date(v).toLocaleString("pt-BR")}`
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Histórico detalhado */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Histórico Completo</h2>

        {history.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">
            Você ainda não realizou nenhum simulado.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {history.map((h) => (
            <div
              key={h.id}
              className="bg-white dark:bg-gray-800 shadow-lg p-4 rounded-xl"
            >
              <p className="text-lg font-semibold">
                Desempenho:{" "}
                <span
                  className={
                    h.percentage >= 70
                      ? "text-green-500"
                      : h.percentage >= 40
                      ? "text-yellow-400"
                      : "text-red-500"
                  }
                >
                  {h.percentage}%
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Data: {new Date(h.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
