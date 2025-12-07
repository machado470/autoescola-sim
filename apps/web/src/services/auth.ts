import axios from "axios";

const API = "http://localhost:3000";

export async function loginUser(email: string, password: string) {
  const res = await axios.post(`${API}/auth/login`, { email, password });

  // Guarda token para o resto da aplicação
  localStorage.setItem("token", res.data.access_token);

  return res.data.user;
}
