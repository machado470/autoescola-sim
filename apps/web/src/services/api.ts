import axios from "axios"
const api=axios.create({baseURL:import.meta.env.VITE_API_URL||"http://localhost:8080/api"})
export async function startExam(payload:{categoryId:string,limit:number}){
  const{data}=await api.post("/exam/start",payload);return data
}
export async function getNextQuestion(sessionId:string){
  const{data}=await api.get(\`/exam/\${sessionId}/next\`);return data
}
export async function sendAnswer(sessionId:string,body:{questionId:string,choiceId:string}){
  const{data}=await api.post(\`/exam/\${sessionId}/answer\`,body);return data
}
export async function finishExam(sessionId:string){
  const{data}=await api.post(\`/exam/\${sessionId}/finish\`);return data
}
