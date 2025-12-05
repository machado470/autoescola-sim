import api from "@/lib/api";

/**
 * Retorna progresso real da fase:
 * - lessonsCompleted
 * - correctAnswers
 * - finished
 */
export async function getPhaseProgress(phaseId: string) {
  const res = await api.get(`/progress/phase/${phaseId}`);
  return res.data;
}

/**
 * Marca início da fase (primeiro acesso)
 */
export async function startPhase(phaseId: string) {
  const res = await api.post("/progress/lesson", { phaseId });
  return res.data;
}
