"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function FasesPage() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [faseNome, setFaseNome] = useState("");
  const [faseOrdem, setFaseOrdem] = useState(1);
  const [categoriaId, setCategoriaId] = useState("");

  async function carregarCategorias() {
    const res = await api.get("/categories");
    setCategorias(res.data);
  }

  async function criarFase(e: any) {
    e.preventDefault();
    if (!faseNome || !categoriaId) return;

    await api.post("/phases", {
      name: faseNome,
      order: Number(faseOrdem),
      categoryId,
    });

    setFaseNome("");
    setFaseOrdem(1);
    carregarCategorias(); // recarrega fases vinculadas
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Fases</h1>

      {/* FORM */}
      <form onSubmit={criarFase} className="flex gap-4 mb-8 items-end">
        <div className="flex flex-col">
          <label>Nome da fase</label>
          <input
            className="border px-3 py-2 rounded w-64"
            value={faseNome}
            onChange={(e) => setFaseNome(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label>Ordem</label>
          <input
            type="number"
            className="border px-3 py-2 rounded w-24"
            value={faseOrdem}
            onChange={(e) => setFaseOrdem(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label>Categoria</label>
          <select
            className="border px-3 py-2 rounded w-64"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Selecione...</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Criar Fase
        </button>
      </form>

      {/* LISTAGEM */}
      <div className="flex flex-col gap-6">
        {categorias.map((cat) => (
          <div key={cat.id} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>

            {cat.phases?.length ? (
              <ul className="flex flex-col gap-2">
                {cat.phases.map((fase: any) => (
                  <li
                    key={fase.id}
                    className="border p-3 rounded flex justify-between"
                  >
                    <span>
                      {fase.order}. {fase.name}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma fase cadastrada.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
