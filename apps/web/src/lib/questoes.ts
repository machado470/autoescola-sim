import api from "./api";

export type Questao = {
  id: number;
  enunciado: string;
  categoria: string;
  criadaEm: string;
  atualizadaEm: string;
};

export async function listarQuestoes(): Promise<Questao[]> {
  const res = await api.get("/question");
  return res.data;
}

export async function criarQuestao(enunciado: string, categoria: string) {
  const res = await api.post("/question", { enunciado, categoria });
  return res.data;
}
