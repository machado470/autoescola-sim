export async function getLessonsByPhase(phaseId: string) {
  const res = await fetch(`http://localhost:3001/lessons/by-phase/${phaseId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao carregar lições.");

  return res.json();
}
