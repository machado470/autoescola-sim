import api from "../lib/api";
import { saveAuth } from "../lib/auth";

export async function login(email: string, password: string) {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    saveAuth(data.access_token, data.user);
    return { ok: true, user: data.user };
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return { ok: false, error: "Credenciais inválidas" };
  }
}
