/** Lista trilhas por curso (PH, Reciclagem, Atualização) */
import { Link } from 'react-router-dom'
import manifest from '../data/tracks/ph/manifest.json'

type TrackManifest = {
  id: string
  title: string
  description?: string
}

export default function Trilhas() {
  return (
    <section className="space-y-6 rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-6 shadow-sm shadow-black/5 backdrop-blur sm:p-10">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Trilhas — Primeira Habilitação
        </h2>
        <p className="max-w-2xl text-sm text-[color:var(--muted)] sm:text-base">
          Escolha uma trilha para continuar seus estudos. Cada módulo combina aulas, simulados e checkpoints rápidos.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2">
        {(manifest as TrackManifest[]).map((track) => (
          <li key={track.id} className="animate-fade-in-up rounded-2xl border border-[var(--border-subtle)] bg-card-bg/90 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-text-base">{track.title}</h3>
              {track.description && (
                <p className="text-sm text-[color:var(--muted)]">{track.description}</p>
              )}
              <Link
                to={`/aula/${track.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:underline"
              >
                Abrir trilha
                <span aria-hidden>→</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
