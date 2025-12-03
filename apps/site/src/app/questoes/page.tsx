"use client";

import { useEffect, useState } from "react";
import { QuestionsAPI } from "@/lib/api-questions";
import api from "@/lib/api";

export default function QuestoesPage() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [questoes, setQuestoes] = useState<any[]>([]);

  const [statement, setStatement] = useState("");
  const [optionA, setA] = useState("");
  const [optionB, setB] = useState("");
  const [optionC, setC] = useState("");
  const [optionD, setD] = useState("");
  const [correct, setCorrect] = useState("A");
  const [categoryId, setCategoryId] = useState("");

  async function carregarCategorias() {
    const res = await api.get("/categories");
    setCategorias(res.data);
  }

  async function carregarQuestoes() {
    const res = await QuestionsAPI.all();
    setQuestoes(res.data);
  }

  async function criar(e: any) {
    e.preventDefault();
    if (!statement || !categoryId) return;

    await QuestionsAPI.create({
      statement,
      optionA,
      optionB,
      optionC,
      optionD,
      correct,
      categoryId,
    });

    setStatement("");
    setA("");
    setB("");
    setC("");
    setD("");
    setCorrect("A");

    carregarQuestoes();
  }

  useEffect(() => {
    carregarCategorias();
    carregarQuestoes();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Perguntas</h1>

      {/* Formulário */}
      <form onSubmit={criar} className="flex flex-col gap-3 mb-8 w-[500px]">
        <textarea
          className="border px-3 py-2 rounded"
          placeholder="Enunciado"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded"
          placeholder="Opção A"
          value={optionA}
          onChange={(e) => setA(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Opção B"
          value={optionB}
          onChange={(e) => setB(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Opção C"
          value={optionC}
          onChange={(e) => setC(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Opção D"
          value={optionD}
          onChange={(e) => setD(e.target.value)}
        />

        <label className="text-sm font-semibold mt-2">Resposta Correta:</label>
        <select
          className="border px-3 py-2 rounded w-32"
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <label className="text-sm font-semibold mt-2">Categoria:</label>
        <select
          className="border px-3 py-2 rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Selecione...</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Criar Pergunta
        </button>
      </form>

      {/* Listagem */}
      <div className="bg-white rounded shadow p-4">
        {questoes.length === 0 && <p>Nenhuma pergunta cadastrada.</p>}

        <ul className="flex flex-col gap-4">
          {questoes.map((q) => (
            <li key={q.id} className="border p-3 rounded">
              <strong>{q.statement}</strong>
              <ul className="mt-2 text-sm pl-3">
                <li>A: {q.optionA}</li>
                <li>B: {q.optionB}</li>
                <li>C: {q.optionC}</li>
                <li>D: {q.optionD}</li>
              </ul>
              <p className="mt-1 font-semibold text-green-700">
                Correta: {q.correct}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
