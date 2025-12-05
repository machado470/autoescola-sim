import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export async function fetchAlunoDashboard(userId: string) {
  const [phases, progress] = await Promise.all([
    api.get("/phases"),
    api.get(`/progress/user/${userId}`),
  ]);

  return {
    phases: phases.data,
    progress: progress.data,
  };
}

export async function fetchAlunoInfo(userId: string) {
  const user = await api.get(`/users/${userId}`);
  return user.data;
}
