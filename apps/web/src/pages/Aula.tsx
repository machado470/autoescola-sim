/** Renderiza blocks da trilha. Simplificado para 1º bloco. */
import { useParams } from 'react-router-dom'
import { BlockRenderer } from '../components/lessons/BlockRenderer'
import { loadTrackById } from '../data/loaders'
export default function Aula(){
  const { trackId } = useParams()
  const track = loadTrackById(trackId!)
  return (<div style={{padding:24}}>
    <h2>{track.title}</h2>
    <BlockRenderer block={track.blocks[0]} onDone={()=>{}}/>
  </div>)
}