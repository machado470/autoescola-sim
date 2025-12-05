import api from "@/lib/api";

export async function getLessonsByPhase(phaseId: string) {
  const res = await api.get(`/lessons/by-phase/${phaseId}`);
  return res.data;
}
