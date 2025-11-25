import { getUser, getToken } from "../lib/auth";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const user = getUser();
  const token = getToken();

  if (!user || !token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white px-4">
      <div className="w-full max-w-md bg-[#0A0F1C] p-10 rounded-3xl shadow-[0_0_40px_#00112277]">

        <h2 className="text-sm tracking-widest text-green-400 mb-2">
          ÁREA DO ALUNO
        </h2>

        <h1 className="text-3xl font-bold mb-4 leading-tight">
          Olá, <br /> {user.email}
        </h1>

        <p className="text-gray-400 mb-6">
          Bem-vindo à sua área de treino da prova teórica.
        </p>

        <a
          href="/simulado"
          className="block w-full text-center bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-full transition mb-4"
        >
          Iniciar simulado
        </a>

        <a
          href="/"
          onClick={() => localStorage.clear()}
          className="block w-full text-center bg-[#131a2a] hover:bg-[#1c2439] text-white font-semibold py-3 rounded-full transition"
        >
          Sair
        </a>

        <a href="/" className="block text-center mt-6 text-gray-400 text-sm hover:text-gray-300">
          Voltar para a página inicial
        </a>

      </div>
    </div>
  );
}
