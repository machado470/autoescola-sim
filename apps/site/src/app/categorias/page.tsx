"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [nome, setNome] = useState("");

  async function carregar() {
    const res = await api.get("/categories");
    setCategorias(res.data);
  }

  async function criarCategoria(e: any) {
    e.preventDefault();
    if (!nome) return;

    await api.post("/categories", { name: nome });
    setNome("");
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categorias</h1>

      {/* Criar nova */}
      <form onSubmit={criarCategoria} className="flex gap-3 mb-6">
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Criar
        </button>
      </form>

      {/* Listagem */}
      <div className="bg-white rounded shadow p-4">
        {categorias.length === 0 && <p>Nenhuma categoria encontrada.</p>}

        <ul className="flex flex-col gap-2">
          {categorias.map((c) => (
            <li
              key={c.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
