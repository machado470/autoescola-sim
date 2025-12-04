"use client";

import { useSearchParams } from "next/navigation";
import { useAula } from "@/hooks/useAula";

export default function AulaAluno() {
  const params = useSearchParams();
  const lessonId = params.get("lesson") ?? "";

  const { aula, loading } = useAula(lessonId);

  if (loading) return <p>Carregando aula...</p>;
  if (!aula) return <p>Aula não encontrada.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{aula.title}</h2>

      <p>{aula.content}</p>

      <a
        href={`/(aluno)/quiz?phase=${aula.phaseId}`}
        className="block bg-blue-600 text-white py-3 rounded-xl text-center font-semibold"
      >
        Iniciar Quiz
      </a>
    </div>
  );
}
