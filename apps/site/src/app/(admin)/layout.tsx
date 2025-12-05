import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col gap-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>

        <nav className="flex flex-col gap-4 text-gray-300">
          <Link href="/(admin)/dashboard" className="hover:text-blue-400 transition">�� Dashboard</Link>
          <Link href="/(admin)/categorias" className="hover:text-blue-400 transition">🗂 Categorias</Link>
          <Link href="/(admin)/fases" className="hover:text-blue-400 transition">📚 Fases</Link>
          <Link href="/(admin)/questoes" className="hover:text-blue-400 transition">❓ Questões</Link>
          <Link href="/(admin)/aulas" className="hover:text-blue-400 transition">🎥 Aulas</Link>
        </nav>

        <div className="mt-auto text-sm text-gray-500">
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
