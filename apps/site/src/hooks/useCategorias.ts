import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/categories");
        setCategorias(res.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { categorias, loading };
}
