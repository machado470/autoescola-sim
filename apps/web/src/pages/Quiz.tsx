import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getNextQuestion, sendAnswer, finishExam } from "../services/api"
type Choice={id:string;text:string}
type Question={id:string;statement:string;choices:Choice[]}
export default function Quiz(){
  const { sessionId } = useParams()
  const nav = useNavigate()
  const [q,setQ]=useState<Question|null>(null)
  const [i,setI]=useState(0)
  const [total,setTotal]=useState(0)
  const [lock,setLock]=useState(false)
  useEffect(()=>{(async()=>{
    const r=await getNextQuestion(sessionId!)
    if(r.done){nav(\`/resultado/\${sessionId}\`);return}
    setQ(r.question!);setTotal(r.total)
  })()},[sessionId,i])
  async function choose(choiceId:string){
    if(!q||lock)return
    setLock(true)
    await sendAnswer(sessionId!,{questionId:q.id,choiceId})
    if(i+1>=total){
      const res=await finishExam(sessionId!)
      nav(\`/resultado/\${sessionId}\`,{state:res})
    }else{setI(v=>v+1);setLock(false)}
  }
  if(!q)return<div className="p-6 text-center">Carregando…</div>
  return<div className="max-w-md mx-auto p-4 space-y-4">
    <div className="text-sm text-gray-500">Pergunta {i+1} de {total}</div>
    <h2 className="text-xl font-bold">{q.statement}</h2>
    <div className="space-y-3">
      {q.choices.map(c=>(
        <button key={c.id} onClick={()=>choose(c.id)} className="w-full border rounded-xl p-3 text-left hover:bg-gray-50 disabled:opacity-60" disabled={lock}>{c.text}</button>
      ))}
    </div>
  </div>
}
