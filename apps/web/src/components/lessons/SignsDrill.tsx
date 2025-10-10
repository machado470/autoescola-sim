/** Treino simples de placas (placeholder). */
export function SignsDrill({ signs, onDone }: any){
  return (<div style={{background:'#fff',padding:16,borderRadius:12,border:'1px solid #e5e7eb'}}>
    <h4>Treino de Placas</h4>
    <ul>{signs?.map((s:any)=><li key={s.code}>{s.code} — {s.name}</li>)}</ul>
    <button onClick={onDone} style={{marginTop:12}}>Concluir</button>
  </div>)
}
