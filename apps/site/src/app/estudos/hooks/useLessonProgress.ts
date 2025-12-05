import api from "@/lib/api";

/**
 * Informa ao backend que o aluno concluiu uma lição.
 * Isso incrementa "lessonsCompleted" na fase.
 */
export async function completeLesson(phaseId: string) {
  const res = await api.post("/progress/lesson", { phaseId });
  return res.data;
}
