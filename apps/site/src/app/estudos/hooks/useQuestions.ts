import api from "@/lib/api";

export async function getQuestionsByPhase(phaseId: string) {
  const res = await api.get(`/questions/by-phase/${phaseId}`);
  return res.data;
}
