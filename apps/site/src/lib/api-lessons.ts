import api from "./api";

export const LessonsAPI = {
  all: () => api.get("/lessons"),
  get: (id: string) => api.get(`/lessons/${id}`),
  create: (data: any) => api.post("/lessons", data),
  update: (id: string, data: any) => api.patch(`/lessons/${id}`, data),
  delete: (id: string) => api.delete(`/lessons/${id}`),
};
