import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

type DashboardData = {
  name: string;
  lessonsCompleted: number;
  correctAnswers: number;
  totalQuestions: number;
  lastSimulations: { id: string; score: number; createdAt: string }[];
};

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3001/students/me/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data));
  }, []);

  if (!data) return <Layout>Carregando...</Layout>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Bem-vindo, {data.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-[#161B22] shadow">
          <h2 className="text-lg font-semibold">Aulas Concluídas</h2>
          <p className="text-3xl font-bold">{data.lessonsCompleted}</p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-[#161B22] shadow">
          <h2 className="text-lg font-semibold">Acertos</h2>
          <p className="text-3xl font-bold">
            {data.correctAnswers} / {data.totalQuestions}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-[#161B22] shadow">
          <h2 className="text-lg font-semibold">Últimas Simulações</h2>
          {data.lastSimulations.length === 0 ? (
            <p className="text-sm text-gray-400">Nenhuma simulação.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {data.lastSimulations.map((sim) => (
                <li key={sim.id}>{sim.score}%</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
