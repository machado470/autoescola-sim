export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white px-4">
      <div className="w-full max-w-md bg-[#0A0F1C] p-10 rounded-3xl shadow-[0_0_40px_#00112277]">
        
        <h2 className="text-sm tracking-widest text-green-400 mb-2">
          AUTOESCOLA SIM
        </h2>

        <h1 className="text-3xl font-bold mb-4 leading-tight">
          Treine para a prova <br />
          <span className="text-green-400">teórica</span>
        </h1>

        <p className="text-gray-400 mb-8">
          Simulados rápidos e correção automática para você passar de primeira.
        </p>

        <a
          href="/simulado"
          className="block w-full text-center bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-full transition mb-4"
        >
          Iniciar simulado rápido
        </a>

        <a
          href="/login"
          className="block w-full text-center bg-[#131a2a] hover:bg-[#1c2439] text-white font-semibold py-3 rounded-full transition"
        >
          Área do aluno (login)
        </a>
      </div>
    </div>
  );
}
