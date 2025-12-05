import api from "@/lib/api";

export async function submitAnswer(phaseId: string, isCorrect: boolean) {
  const res = await api.post("/progress/answer", { phaseId, isCorrect });
  return res.data;
}

export async function finishPhase(phaseId: string) {
  const res = await api.post("/progress/finish", { phaseId });
  return res.data;
}
