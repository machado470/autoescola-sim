"use client";

import { useEffect, useState } from "react";
import { getAlunoFase } from "@/lib/api-student";

export default function useFaseAluno(studentId: string, phaseId: string) {
  const [loading, setLoading] = useState(true);
  const [fase, setFase] = useState<any>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const data = await getAlunoFase(studentId, phaseId);
        setFase(data);
      } catch (err) {
        console.error("Erro carregando fase:", err);
      }

      setLoading(false);
    }

    load();
  }, [studentId, phaseId]);

  return { loading, fase };
}
