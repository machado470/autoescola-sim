import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AutoEscola-Sim",
  description: "Painel Administrativo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex min-h-screen">
          {/* SIDEBAR */}
          <aside className="w-64 bg-black text-white p-6 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-6">AutoEscola-Sim</h1>

            <nav className="flex flex-col gap-3 text-lg">
              <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
              <Link href="/categorias" className="hover:text-blue-400">Categorias</Link>
              <Link href="/fases" className="hover:text-blue-400">Fases</Link>
              <Link href="/questoes" className="hover:text-blue-400">Questões</Link>
              <Link href="/aulas" className="hover:text-blue-400">Aulas</Link>
            </nav>
          </aside>

          {/* CONTEÚDO PRINCIPAL */}
          <main className="flex-1 p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
