"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  useAuth();

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const [cat, qst, les] = await Promise.all([
          api.get("/categories"),
          api.get("/questions"),
          api.get("/lessons"),
        ]);

        setStats({
          categories: cat.data.length,
          questions: qst.data.length,
          lessons: les.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  if (!stats) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Painel Administrativo</h1>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 20,
        }}
      >
        <Box title="Categorias" value={stats.categories} />
        <Box title="Perguntas" value={stats.questions} />
        <Box title="Aulas" value={stats.lessons} />
      </div>
    </div>
  );
}

function Box({ title, value }: any) {
  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: 20,
        borderRadius: 8,
        width: 180,
        textAlign: "center",
        fontSize: 18,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <strong>{title}</strong>
      <div style={{ fontSize: 32 }}>{value}</div>
    </div>
  );
}
