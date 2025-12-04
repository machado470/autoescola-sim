const USER_ID = "demo-user";

export async function submitAnswer(questionId: string, selectedAlternative: string) {
  const res = await fetch("http://localhost:3001/question-answer/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: USER_ID,
      questionId,
      selectedAlternative,
    }),
  });

  if (!res.ok) throw new Error("Erro ao enviar resposta.");

  return res.json();
}

export async function finishQuiz(phaseId: string) {
  const res = await fetch(`http://localhost:3001/question-answer/finish/${USER_ID}/${phaseId}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Erro ao finalizar quiz.");

  return res.json();
}
