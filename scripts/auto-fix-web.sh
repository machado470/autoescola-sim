#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Reescreve services/api.ts correto
cat > apps/web/src/services/api.ts <<'TS'
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
})

export async function startExam(payload: { categoryId: string; limit: number }) {
  const { data } = await api.post("/exam/start", payload)
  return data as { sessionId: string; total: number }
}

export async function getNextQuestion(sessionId: string) {
  const { data } = await api.get(`/exam/${sessionId}/next`)
  return data as {
    done?: boolean
    total: number
    question?: { id: string; statement: string; choices: { id: string; text: string }[] }
  }
}

export async function sendAnswer(
  sessionId: string,
  body: { questionId: string; choiceId: string }
) {
  const { data } = await api.post(`/exam/${sessionId}/answer`, body)
  return data
}

export async function finishExam(sessionId: string) {
  const { data } = await api.post(`/exam/${sessionId}/finish`)
  return data as { correct: number; total: number; xp: number }
}
TS

# Corrige navegação do Quiz e remove escapes sobrando
sed -i $'s#nav(\\\\`/resultado/\\\\${sessionId}\\\\`)#nav(`/resultado/${sessionId}`)#' apps/web/src/pages/Quiz.tsx || true
sed -i $'s/\\\\`/`/g; s/\\\\\\${/${/g' apps/web/src/pages/Quiz.tsx || true

# .env do front
echo 'VITE_API_URL=http://localhost:8080/api' > apps/web/.env.local

echo "✅ auto-fix-web ok."
