type StartResponse = {
  sessionId: string;
  question: {
    id: string;
    statement: string;
    choices: { id: string; text: string }[];
    selectedChoiceId?: string;
  } | null;
  index: number;
  total: number;
  remainingSec: number;
  finished?: boolean;
};

const BASE = "/api/exams"; // ajuste conforme o backend

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function startSession(): Promise<StartResponse> {
  const res = await fetch(`${BASE}/session/start`, { method: "POST" });
  return json(res);
}

export async function submitAnswer(sessionId: string, questionId: string, choiceId: string) {
  const res = await fetch(`${BASE}/session/${sessionId}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, choiceId }),
  });
  return json<StartResponse>(res);
}

export async function getCurrent(sessionId: string) {
  const res = await fetch(`${BASE}/session/${sessionId}/current`);
  return json<StartResponse>(res);
}
