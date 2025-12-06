export async function getAlunoDashboard(id: string) {
  const res = await fetch(`http://localhost:3000/students/${id}/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar dashboard do aluno");

  return res.json();
}

export async function getAlunoFase(studentId: string, phaseId: string) {
  const res = await fetch(
    `http://localhost:3000/students/${studentId}/fase/${phaseId}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Erro ao buscar dados da fase");

  return res.json();
}
