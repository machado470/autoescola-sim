import api from "./api";

export async function getCategorias() {
  return api.get("/categories");
}

export async function criarCategoria(data: { name: string }) {
  return api.post("/categories", data);
}
