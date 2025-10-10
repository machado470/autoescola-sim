/** Lista trilhas por curso (PH, Reciclagem, Atualização) */
import manifest from '../data/tracks/ph/manifest.json'
export default function Trilhas(){
  return (<div style={{padding:24}}>
    <h2>Trilhas — Primeira Habilitação</h2>
    <ul>{manifest.map((t:any)=> <li key={t.id}>{t.title}</li>)}</ul>
  </div>)
}