import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/stats/student");
        setData(res.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, loading };
}
