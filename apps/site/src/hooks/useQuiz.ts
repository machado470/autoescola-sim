import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useQuiz(phaseId: string) {
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!phaseId) return;

    async function load() {
      try {
        const res = await api.get(`/questions/phase/${phaseId}`);
        setQuestoes(res.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [phaseId]);

  return { questoes, loading };
}
