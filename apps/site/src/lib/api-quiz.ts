import api from "./api";

export const QuizAPI = {
  start: (categoryId: string) =>
    api.post("/quiz/start", { categoryId }),

  submit: (data: any) =>
    api.post("/quiz/finish", data),
};
