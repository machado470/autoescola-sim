"use client";

import { useSearchParams } from "next/navigation";
import { useFases } from "@/hooks/useFases";

export default function FasesAluno() {
  const params = useSearchParams();
  const categoryId = params.get("cat") ?? "";
  const { fases, loading } = useFases(categoryId);

  if (loading) return <p>Carregando fases...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Fases</h2>

      {fases.map((fase: any) => (
        <a
          key={fase.id}
          href={`/(aluno)/aula?lesson=${fase.lessonId}`}
          className="block bg-white p-4 rounded-xl shadow"
        >
          {fase.name}
        </a>
      ))}
    </div>
  );
}
