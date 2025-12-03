"use client";

import { useEffect, useState } from "react";
import { LessonsAPI } from "@/lib/api-lessons";

export default function AulasPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function load() {
    const res = await LessonsAPI.all();
    setLessons(res.data);
  }

  async function create(e: any) {
    e.preventDefault();
    if (!title || !content) return;

    await LessonsAPI.create({ title, content });
    setTitle("");
    setContent("");
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Aulas</h1>

      {/* Formulário */}
      <form onSubmit={create} className="flex flex-col gap-3 mb-6 w-[400px]">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border px-3 py-2 rounded"
          placeholder="Conteúdo"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Criar Aula
        </button>
      </form>

      {/* Listagem */}
      <div className="bg-white rounded shadow p-4">
        {lessons.length === 0 && <p>Nenhuma aula cadastrada.</p>}

        <ul className="flex flex-col gap-2">
          {lessons.map((a) => (
            <li key={a.id} className="border p-3 rounded">
              <strong>{a.title}</strong>
              <p className="text-sm mt-1">{a.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
