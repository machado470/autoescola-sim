/** Landing com CTA para Trilhas e Simulado. */
import { API_BASE_URL } from '../config'

const apiUrl = API_BASE_URL

export default function Home() {
  return (
    <section className="space-y-6 rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-6 shadow-sm shadow-black/5 backdrop-blur sm:p-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">AutoEscola Sim</h1>
        <p className="max-w-2xl text-base text-[color:var(--muted)] sm:text-lg">
          Continue sua jornada com trilhas guiadas, simulados oficiais e treinos de percepção de risco.
        </p>
      </header>
      <div className="flex flex-col gap-3 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:gap-6">
        <a
          href="/trilhas"
          className="inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-base font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
        >
          Ver Trilhas
        </a>
        <a
          href="/simulado/a"
          className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-subtle)] px-5 py-3 text-base font-semibold transition-all duration-300 hover:border-accent/60 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
        >
          Simulado rápido
        </a>
      </div>

      {import.meta.env.DEV && (
        <div className="rounded-2xl border border-blue-200/70 bg-blue-100/70 px-4 py-3 text-sm text-blue-900 shadow-sm dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-100">
          <strong className="block text-sm font-semibold uppercase tracking-wide text-blue-900 dark:text-blue-200">
            API base URL
          </strong>
          <p className="mt-1 break-words text-blue-900/80 dark:text-blue-200/80">{apiUrl}</p>
        </div>
      )}
    </section>
  )
}
