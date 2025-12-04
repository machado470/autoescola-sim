export async function getPhases() {
  const res = await fetch("http://localhost:3001/phases", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Não foi possível carregar as fases.");
  }

  return res.json();
}

