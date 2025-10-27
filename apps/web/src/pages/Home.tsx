import { useState } from "react"
import { startExam } from "../services/api"
const CATS = [
  { id:"sinalizacao", name:"Sinalização", color:"bg-yellow-100" },
  { id:"direcao-defensiva", name:"Direção Defensiva", color:"bg-green-100" },
  { id:"mecanica", name:"Mecânica", color:"bg-purple-100" },
]
export default function Home(){
  const [loading,setLoading]=useState<string|null>(null)
  async function handleStart(categoryId:string){
    setLoading(categoryId)
    const r = await startExam({ categoryId, limit: 10 })
    window.location.href = `/quiz/${r.sessionId}`
  }
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <header className="flex items-center gap-3">
        <img src="https://em-content.zobj.net/thumbs/240/apple/354/construction_1f6a7.png" className="w-10" />
        <h1 className="text-2xl font-bold">AutoEscola-Sim</h1>
      </header>
      <button onClick={()=>handleStart("mistao")} className="w-full py-3 rounded-2xl bg-blue-600 text-white font-semibold">Iniciar Simulado</button>
      <div className="grid grid-cols-3 gap-3">
        {CATS.map(c=>(
          <button key={c.id} onClick={()=>handleStart(c.id)} className={`h-28 rounded-2xl ${c.color} flex items-center justify-center text-center p-2`}>
            <span className="font-semibold">{c.name}</span>
            {loading===c.id && <span className="ml-2 text-sm">…</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
