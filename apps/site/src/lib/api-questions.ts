import api from "./api";

export const QuestionsAPI = {
  all: () => api.get("/questions"),
  get: (id: string) => api.get(`/questions/${id}`),
  create: (data: any) => api.post("/questions", data),
  update: (id: string, data: any) => api.patch(`/questions/${id}`, data),
  delete: (id: string) => api.delete(`/questions/${id}`),
};
