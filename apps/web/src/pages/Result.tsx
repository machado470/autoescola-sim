import { useLocation, Link } from "react-router-dom"
export default function Result(){
  const { state } = useLocation() as any
  const { correct=0,total=0,xp=0 } = state||{}
  return(
    <div className="max-w-md mx-auto p-6 text-center space-y-4">
      <h1 className="text-2xl font-bold">Resultado</h1>
      <p className="text-lg">Acertos: <b>{correct}</b> / {total}</p>
      <p className="text-lg">XP ganho: <b>{xp}</b></p>
      <Link to="/" className="inline-block bg-blue-600 text-white px-5 py-3 rounded-xl">Voltar para Home</Link>
    </div>
  )
}
