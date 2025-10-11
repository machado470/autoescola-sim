import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../lib/apiClient'

type StatsResponse = {
  alunos: number
  instrutores: number
  simulados: number
}

type ApiStatus = 'online' | 'offline'

function parseError(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message
  }
  return 'Não foi possível carregar os dados do dashboard.'
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json()
    if (typeof data?.message === 'string') {
      return data.message
    }
    if (Array.isArray(data?.message)) {
      return data.message.join(', ')
    }
  } catch (error) {
    console.error('Falha ao interpretar erro da API', error)
  }
  return `${response.status} - ${response.statusText}`.trim()
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [status, setStatus] = useState<ApiStatus>('offline')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        const statsResponse = await apiFetch('/stats')
        if (!statsResponse.ok) {
          const message = await readErrorMessage(statsResponse)
          throw new Error(message)
        }
        const statsData: StatsResponse = await statsResponse.json()
        if (active) {
          setStats(statsData)
        }
      } catch (error) {
        if (active) {
          setStats(null)
          setError(parseError(error))
        }
      }

      try {
        const healthResponse = await apiFetch('/health', { auth: false })
        if (!healthResponse.ok) {
          throw new Error('Health check falhou')
        }
        const healthData: { status?: string } = await healthResponse.json()
        if (active) {
          setStatus(healthData?.status === 'ok' ? 'online' : 'offline')
        }
      } catch (error) {
        console.error('Falha ao verificar status da API', error)
        if (active) {
          setStatus('offline')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [])

  const cards = useMemo(
    () => [
      {
        title: 'Alunos Cadastrados',
        value: stats?.alunos ?? '--',
      },
      {
        title: 'Instrutores',
        value: stats?.instrutores ?? '--',
      },
      {
        title: 'Simulados',
        value: stats?.simulados ?? '--',
      },
    ],
    [stats],
  )

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[color:var(--muted)]">
          Acompanhe o desempenho da AutoEscola em tempo real.
        </p>
      </div>
      {loading && <p className="text-sm text-[color:var(--muted)]">Carregando dados...</p>}
      {error && (
        <div className="rounded-2xl border border-orange-200/70 bg-orange-100/60 px-4 py-3 text-sm text-orange-900 shadow-sm dark:border-orange-400/40 dark:bg-orange-500/10 dark:text-orange-100">
          {error}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="group flex flex-col gap-3 rounded-2xl border border-transparent bg-card-bg/90 p-5 shadow-sm ring-1 ring-[var(--border-subtle)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-accent/40 animate-fade-in-up dark:ring-0 dark:hover:ring-0"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <span className="text-sm font-medium text-[color:var(--muted)]">{card.title}</span>
            <strong className="text-4xl font-semibold text-text-base">{card.value}</strong>
          </article>
        ))}
        <article
          className={`flex flex-col justify-center gap-3 rounded-2xl p-5 text-sm font-medium transition-all duration-300 animate-fade-in-up ${
            status === 'online'
              ? 'bg-emerald-100/80 text-emerald-800 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-200'
              : 'bg-rose-100/80 text-rose-800 shadow-sm dark:bg-rose-500/10 dark:text-rose-200'
          }`}
          style={{ animationDelay: `${cards.length * 80}ms` }}
        >
          <span>Status da API</span>
          <strong className="text-2xl font-semibold">
            {status === 'online' ? 'Online' : 'Offline'}
          </strong>
        </article>
      </div>
    </section>
  )
}
