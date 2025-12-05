export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      <aside className="w-64 bg-white shadow-xl border-r flex flex-col p-6">
        <h2 className="text-xl font-bold mb-8 text-blue-700">ADMIN</h2>

        <nav className="flex flex-col gap-4 text-gray-700 font-medium">
          <a href="/admin/dashboard" className="hover:text-blue-600">Dashboard</a>
          <a href="/admin/categorias" className="hover:text-blue-600">Categorias</a>
          <a href="/admin/fases" className="hover:text-blue-600">Fases</a>
          <a href="/admin/questoes" className="hover:text-blue-600">Questões</a>
          <a href="/admin/aulas" className="hover:text-blue-600">Aulas</a>
        </nav>

        <div className="mt-auto pt-6 text-sm text-gray-400">
          AutoEscola-Sim © {new Date().getFullYear()}
        </div>
      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
