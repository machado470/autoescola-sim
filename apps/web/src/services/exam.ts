import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // troca a porta se teu back estiver em outra
});

export async function fetchQuestions() {
  const res = await api.get('/questions');
  return res.data;
}
