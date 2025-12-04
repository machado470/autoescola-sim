import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useFases(categoryId: string) {
  const [fases, setFases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    async function load() {
      try {
        const res = await api.get(`/phases/category/${categoryId}`);
        setFases(res.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [categoryId]);

  return { fases, loading };
}
