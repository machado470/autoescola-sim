import api from "@/lib/api";

export async function getLesson(id: string) {
  const res = await api.get(`/lessons/${id}`);
  return res.data;
}
