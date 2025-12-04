const USER_ID = "demo-user";

export async function getLessonProgress() {
  const res = await fetch("http://localhost:3001/lesson-progress", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao carregar progresso das lições.");

  const all = await res.json();

  return all.filter((p: any) => p.userId === USER_ID);
}

export async function finishLesson(progressId: string) {
  const res = await fetch(`http://localhost:3001/lesson-progress/${progressId}/finish`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: true }),
  });

  if (!res.ok) throw new Error("Erro ao finalizar lição.");

  return res.json();
}
