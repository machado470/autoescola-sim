"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  async function load() {
    const res = await api.get("/categories");
    setCategorias(res.data);
    setLoading(false);
  }

  async function deleteCategoria(id: string) {
    if (!confirm("Deseja excluir esta categoria?")) return;

    await api.delete(`/categories/${id}`);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Nova Categoria
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Nome</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat: any) => (
              <tr key={cat.id} className="border-t">
                <td className="p-2">{cat.name}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => {
                      setSelected(cat);
                      setShowEdit(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded"
                    onClick={() => deleteCategoria(cat.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showCreate && (
        <CreateModal onClose={() => setShowCreate(false)} reload={load} />
      )}

      {showEdit && selected && (
        <EditModal
          categoria={selected}
          onClose={() => setShowEdit(false)}
          reload={load}
        />
      )}
    </div>
  );
}

function CreateModal({ onClose, reload }: any) {
  const [name, setName] = useState("");

  async function submit() {
    await api.post("/categories", { name });
    reload();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Nova Categoria</h2>

        <input
          className="border p-2 w-full rounded mb-3"
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancelar
          </button>

          <button
            onClick={submit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ categoria, onClose, reload }: any) {
  const [name, setName] = useState(categoria.name);

  async function submit() {
    await api.patch(`/categories/${categoria.id}`, { name });
    reload();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Editar Categoria</h2>

        <input
          className="border p-2 w-full rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancelar
          </button>

          <button
            onClick={submit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
