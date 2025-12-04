/* eslint-disable @next/next/no-img-element */

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <header className="p-4 flex items-center gap-2 border-b">
        <img src="/icone-cone.png" alt="icone" className="w-9 h-9" />
        <h1 className="text-xl font-bold text-gray-800">AutoEscola-Sim</h1>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 p-4">{children}</main>

      {/* Navbar */}
      <nav className="h-16 border-t bg-white flex justify-around items-center">
        <a href="/(aluno)/dashboard" className="flex flex-col items-center text-sm text-gray-600">
          <span className="text-2xl">🏠</span> Início
        </a>
        <a href="/(aluno)/categorias" className="flex flex-col items-center text-sm text-gray-600">
          <span className="text-2xl">📚</span> Categorias
        </a>
        <a href="/(aluno)/progresso" className="flex flex-col items-center text-sm text-gray-600">
          <span className="text-2xl">📊</span> Progresso
        </a>
        <a href="/(aluno)/perfil" className="flex flex-col items-center text-sm text-gray-600">
          <span className="text-2xl">👤</span> Perfil
        </a>
      </nav>
    </div>
  );
}
