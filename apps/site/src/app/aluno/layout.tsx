import "../globals.css";
import Link from "next/link";

export const metadata = {
  title: "Aluno | AutoEscola Sim",
};

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[#4F8DFD]">
          AutoEscola Sim
        </h1>

        <Link
          href="/aluno/perfil"
          className="text-sm font-medium text-[#4F8DFD] hover:underline"
        >
          Perfil
        </Link>
      </nav>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
