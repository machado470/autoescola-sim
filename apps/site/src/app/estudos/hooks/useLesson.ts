export async function getLesson(id: string) {
  const res = await fetch(`http://localhost:3001/lessons/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar a lição.");
  }

  return res.json();
}
