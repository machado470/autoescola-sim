/** Quiz de 10 perguntas com explicação. Simplificado. */
import { useState } from 'react'
export default function Quiz({ blockId, questions, onDone }: any){
  const [answers,setAnswers]=useState<any>({}); const [sub,setSub]=useState(false)
  const correct = Object.keys(answers).filter(k=>answers[k]===questions.find((q:any)=>q.id===k)?.correctId).length
  return (<div style={{background:'#fff',padding:16,borderRadius:12,border:'1px solid #e5e7eb'}}>
    <h4>Questionário ({questions.length})</h4>
    {questions.map((q:any,i:number)=>(<div key={q.id} style={{margin:'12px 0'}}>
      <p>{i+1}. {q.stem}</p>
      {q.choices.map((c:any)=>(<label key={c.id} style={{display:'block'}}>
        <input type="radio" name={q.id} value={c.id} onChange={e=>setAnswers((a:any)=>({...a,[q.id]:(e.target as HTMLInputElement).value}))}/> {c.text}
      </label>))}
      {sub && <p style={{color:answers[q.id]===q.correctId?'green':'red'}}>{answers[q.id]===q.correctId?'Correto':'Errado'} — {q.explain}</p>}
    </div>))}
    {!sub ? <button onClick={()=>setSub(true)}>Enviar</button> : <>
      <p>Acertos: {correct}/{questions.length}</p>
      <button onClick={onDone}>Concluir</button>
    </>}
  </div>)
}
