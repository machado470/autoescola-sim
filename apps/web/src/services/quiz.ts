import axios from "axios";

const API = "http://localhost:3000";

export async function startQuiz(token: string, phaseId: string) {
  const res = await axios.post(
    `${API}/quiz/start`,
    { phaseId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function finishQuiz(
  token: string,
  quizId: string,
  answers: { questionId: string; selected: string }[]
) {
  const res = await axios.post(
    `${API}/quiz/finish`,
    { quizId, answers },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
