/** Renderiza blocks da trilha. Simplificado para 1º bloco. */
import { useParams } from 'react-router-dom'
import { BlockRenderer } from '../components/lessons/BlockRenderer'
import { isTrackId, loadTrackById, TrackId } from '../data/loaders'

export default function Aula() {
  const { trackId } = useParams<{ trackId: TrackId }>()

  if (!isTrackId(trackId)) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Trilha não encontrada</h2>
        <p>Volte e selecione uma aula válida para continuar.</p>
      </div>
    )
  }

  const track = loadTrackById(trackId)

  return (
    <div style={{ padding: 24 }}>
      <h2>{track.title}</h2>
      <BlockRenderer block={track.blocks[0]} onDone={() => {}} />
    </div>
  )
}
