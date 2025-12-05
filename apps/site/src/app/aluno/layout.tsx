export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-xl border-r flex flex-col p-6">
        <h2 className="text-xl font-bold mb-8 text-blue-700">Área do Aluno</h2>

        <nav className="flex flex-col gap-4 text-gray-700 font-medium">
          <a href="/aluno/dashboard" className="hover:text-blue-600 transition">📊 Dashboard</a>
          <a href="/estudos" className="hover:text-blue-600 transition">📘 Estudos</a>
          <a href="/aluno/perfil" className="hover:text-blue-600 transition">👤 Perfil</a>
        </nav>

        <div className="mt-auto pt-6 text-sm text-gray-400">
          AutoEscola-Sim © {new Date().getFullYear()}
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
