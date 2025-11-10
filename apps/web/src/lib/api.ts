const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type Answer = { id: number; text: string; isCorrect: boolean };
export type Question = {
  id: number;
  statement: string;
  image?: string | null;
  categoryId: number;
  answers: Answer[];
};

export async function getRandomByCategory(categoryId: number, take = 10) {
  const res = await fetch(`${BASE}/quiz/random-by-category?categoryId=${categoryId}&take=${take}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return (await res.json()) as Question[];
}
