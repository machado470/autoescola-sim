/** Renderiza blocks da trilha. Simplificado para 1º bloco. */
import { useParams } from 'react-router-dom'
import { BlockRenderer } from '../components/lessons/BlockRenderer'
import { isTrackId, loadTrackById, TrackId } from '../data/loaders'

export default function Aula() {
  const { trackId } = useParams<{ trackId: TrackId }>()

  if (!isTrackId(trackId)) {
    return (
      <section className="space-y-4 rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-6 shadow-sm shadow-black/5 backdrop-blur sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-text-base sm:text-3xl">Trilha não encontrada</h2>
        <p className="text-[color:var(--muted)]">Volte e selecione uma aula válida para continuar.</p>
      </section>
    )
  }

  const track = loadTrackById(trackId)

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-6 shadow-sm shadow-black/5 backdrop-blur sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-text-base sm:text-3xl">{track.title}</h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Revise o conteúdo abaixo e finalize a aula para liberar o próximo módulo.
        </p>
      </div>
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-card-bg/90 p-4 shadow-sm shadow-black/5 sm:p-6">
        <BlockRenderer block={track.blocks[0]} onDone={() => {}} />
      </div>
    </section>
  )
}
