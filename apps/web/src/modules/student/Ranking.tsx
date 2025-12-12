import { useEffect, useState } from "react";
import axios from "axios";
import BottomNav from "../../components/ui/BottomNav";

export default function Ranking() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("http://localhost:3001/simulations/ranking", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRanking(res.data);
      } catch (e) {
        console.error("Erro carregando ranking:", e);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        Carregando ranking...
      </div>
    );

  return (
    <div className="min-h-screen p-6 pb-20 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Ranking Geral</h1>

      {ranking.length === 0 && (
        <p className="text-gray-500">Nenhum aluno realizou simulado ainda.</p>
      )}

      <div className="flex flex-col gap-4">
        {ranking.map((u, i) => (
          <div
            key={u.userId}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-4">

              {/* Medalha */}
              <span className="text-3xl">
                {i === 0 && "🥇"}
                {i === 1 && "🥈"}
                {i === 2 && "🥉"}
                {i > 2 && `${i + 1}º`}
              </span>

              <div>
                <p className="font-bold text-lg">{u.name || "Aluno"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {u.attempts} tentativa(s)
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-blue-600">{u.bestScore}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Última: {u.lastScore}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
