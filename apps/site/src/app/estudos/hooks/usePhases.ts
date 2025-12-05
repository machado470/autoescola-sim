export async function getPhases() {
  const api = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${api}/phases`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar fases");
  }

  return res.json();
}
