"use client";

import { useEffect, useState } from "react";
import { fetchAlunoDashboard, fetchAlunoInfo } from "@/lib/api-student";

export default function useAlunoDashboard(userId: string) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [phases, setPhases] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const userData = await fetchAlunoInfo(userId);
      const dash = await fetchAlunoDashboard(userId);

      setUser(userData);
      setPhases(dash.phases);
      setProgress(dash.progress);

      setLoading(false);
    }

    load();
  }, [userId]);

  return { loading, user, phases, progress };
}
