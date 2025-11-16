import api from "./api";

export type Simulado = {
  id: number;
  titulo: string;
  criadoEm: string;
  atualizadoEm: string;
};

export async function listarSimulados(): Promise<Simulado[]> {
  const res = await api.get("/simulator");
  return res.data;
}

export async function criarSimulado(titulo: string) {
  const res = await api.post("/simulator", { titulo });
  return res.data;
}
