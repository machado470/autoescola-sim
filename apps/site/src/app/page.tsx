import { redirect } from "next/navigation";

export default function Home() {
  redirect("/(aluno)/dashboard");

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <p>Carregando...</p>
    </main>
  );
}
