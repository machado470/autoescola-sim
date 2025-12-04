"use client";

import { useCategorias } from "@/hooks/useCategorias";

export default function CategoriasAluno() {
  const { categorias, loading } = useCategorias();

  if (loading) return <p>Carregando categorias...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Categorias</h2>

      <div className="grid grid-cols-2 gap-4">
        {categorias.map((cat: any) => (
          <a
            key={cat.id}
            href={`/(aluno)/fases?cat=${cat.id}`}
            className="p-4 bg-white shadow rounded-xl text-center"
          >
            🚧 <p className="font-semibold mt-2">{cat.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
