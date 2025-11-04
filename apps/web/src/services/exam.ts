import axios from 'axios'

// com o proxy do vite, podemos chamar /api direto em dev
const api = axios.create({ baseURL: '/api' })

export async function fetchQuestions() {
  const res = await api.get('/questions/random?includeAnswers=true')
  return res.data
}

export async function startSession() {
  const res = await api.post('/exams/session/start')
  return res.data
}

export async function submitAnswer(sessionId: string, questionId: string, choiceId: string) {
  const res = await api.post('/exams/session/' + sessionId + '/answer', { questionId, choiceId })
  return res.data
}

export async function getCurrent(sessionId: string) {
  const res = await api.get('/exams/session/' + sessionId + '/current')
  return res.data
}
