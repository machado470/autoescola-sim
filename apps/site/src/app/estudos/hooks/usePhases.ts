export async function getPhases() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const res = await fetch(`${API_URL}/phases`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Não foi possível carregar as fases.");
  }

  return res.json();
}
