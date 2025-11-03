import axios from 'axios'

// com o proxy do Vite, podemos chamar /api direto em dev
const api = axios.create({ baseURL: '/api' })

export async function fetchQuestions() {
  const res = await api.get('/questions')
  return res.data
}
