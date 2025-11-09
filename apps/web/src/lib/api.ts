import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
  withCredentials: false,
});

export type Alternative = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  text: string;
  category: "Sinalização" | "Direção Defensiva" | "Mecânica";
  alternatives: Alternative[];
};

export async function getRandomByCategory(category?: Question["category"]) {
  const url = category
    ? `/quiz/random-by-category?category=${encodeURIComponent(category)}`
    : `/quiz/random-by-category`;
  const { data } = await api.get<{ category: Question["category"]; questions: Question[] }>(url);
  return data;
}
