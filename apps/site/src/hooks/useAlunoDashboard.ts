"use client";

import { useEffect, useState } from "react";
import { getAlunoDashboard } from "@/lib/api-student";

export default function useAlunoDashboard(studentId: string) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [phases, setPhases] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const data = await getAlunoDashboard(studentId);

        setUser(data.user);
        setPhases(data.phases);
      } catch (err) {
        console.error("Erro carregando dashboard do aluno:", err);
      }

      setLoading(false);
    }

    load();
  }, [studentId]);

  return { loading, user, phases };
}
