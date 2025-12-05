import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);

    const profile = await api.get("/auth/me");
    setUser(profile.data);

    return profile.data;
  }

  async function refresh() {
    const rt = localStorage.getItem("refresh_token");
    if (!rt) return logout();

    try {
      const res = await api.post("/auth/refresh", { refresh_token: rt });
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      return true;
    } catch {
      logout();
      return false;
    }
  }

  async function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    window.location.href = "/login";
  }

  async function load() {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch {
      const ok = await refresh();
      if (!ok) setUser(null);
      else {
        const res = await api.get("/auth/me");
        setUser(res.data);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return { user, loading, login, logout };
}
