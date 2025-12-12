import Layout from "../../components/Layout";

export default function AdminDashboard() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Painel do Administrador
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 rounded-xl bg-white dark:bg-[#161B22] shadow">
          <h2 className="text-lg font-semibold">Alunos Cadastrados</h2>
          <p className="text-3xl mt-2 font-bold">—</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Em breve: integração com backend
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-[#161B22] shadow">
          <h2 className="text-lg font-semibold">Simulações Realizadas</h2>
          <p className="text-3xl mt-2 font-bold">—</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Em breve: métricas automáticas
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-[#161B22] shadow">
          <h2 className="text-lg font-semibold">Progresso Global</h2>
          <p className="text-3xl mt-2 font-bold">—%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Evolução geral dos alunos
          </p>
        </div>

      </div>
    </Layout>
  );
}
