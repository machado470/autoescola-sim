import api from "./api";

export async function criarFase(data: {
  name: string;
  order: number;
  categoryId: string;
}) {
  return api.post("/phases", data);
}

export async function listarCategoriasComFases() {
  return api.get("/categories");
}
