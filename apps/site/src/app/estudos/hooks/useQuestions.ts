export async function getQuestionsByPhase(phaseId: string) {
  const res = await fetch(`http://localhost:3001/questions/by-phase/${phaseId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao carregar questões.");

  return res.json();
}
