const USER_ID = "demo-user";

export async function getPhaseProgress() {
  const res = await fetch("http://localhost:3001/phase-progress", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar progresso.");
  }

  const all = await res.json();

  return all.filter((p: any) => p.userId === USER_ID);
}

export async function startPhase(phaseId: string) {
  const res = await fetch("http://localhost:3001/phase-progress/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: USER_ID,
      phaseId,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao iniciar fase.");
  }

  return res.json();
}
