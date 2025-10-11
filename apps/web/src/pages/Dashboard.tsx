import { isAxiosError, type AxiosResponse } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../lib/apiClient'

type StatsResponse = {
  alunos: number
  instrutores: number
  simulados: number
}

type ApiStatus = 'online' | 'offline'

function parseError(error: unknown): string {
  if (isAxiosError(error) && error.message) {
    return error.message
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return 'Não foi possível carregar os dados do dashboard.'
}

function readErrorMessage(response: AxiosResponse<unknown>): string {
  const data = response.data as { message?: string | string[] } | undefined
  if (typeof data?.message === 'string') {
    return data.message
  }
  if (Array.isArray(data?.message)) {
    return data.message.join(', ')
  }
  return `${response.status} - ${response.statusText ?? ''}`.trim()
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
        const statsResponse = await apiFetch<StatsResponse>('/stats')
        if (statsResponse.status >= 400) {
          const message = readErrorMessage(statsResponse)
          throw new Error(message)
        }
        const statsData = statsResponse.data
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
        const healthResponse = await apiFetch<{ status?: string }>('/health', { withAuth: false })
        if (healthResponse.status >= 400) {
          throw new Error('Health check falhou')
        }
        const healthData = healthResponse.data
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
        icon: '👩‍🎓',
        description: 'Total de matrículas ativas na plataforma.',
      },
      {
        title: 'Instrutores',
        value: stats?.instrutores ?? '--',
        icon: '🧑‍🏫',
        description: 'Profissionais acompanhando as turmas.',
      },
      {
        title: 'Simulados',
        value: stats?.simulados ?? '--',
        icon: '🧠',
        description: 'Avaliações disponíveis para os alunos.',
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-3xl border border-transparent bg-card-bg/90 p-6 shadow-soft ring-1 ring-[var(--border-subtle)] transition-all duration-300 animate-fade-in-up motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01] motion-safe:hover:shadow-2xl motion-safe:hover:ring-accent/40 dark:ring-0"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-2xl text-accent transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5">
              {card.icon}
            </span>
            <header className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--muted)]">{card.title}</p>
              <strong className="text-4xl font-semibold text-text-base">{card.value}</strong>
            </header>
            <p className="text-sm text-[color:var(--muted)]">{card.description}</p>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 translate-y-8 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 transition-all duration-300 motion-safe:group-hover:translate-y-0 motion-safe:group-hover:opacity-100" />
          </article>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <article
          className={`flex flex-col justify-center gap-2 rounded-3xl border border-transparent p-6 text-sm font-medium shadow-soft transition-all duration-300 animate-fade-in-up motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl ${
            status === 'online'
              ? 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200'
              : 'bg-rose-100/80 text-rose-900 dark:bg-rose-500/10 dark:text-rose-200'
          }`}
          style={{ animationDelay: `${cards.length * 80}ms` }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Status da API</span>
          <strong className="text-3xl font-semibold">
            {status === 'online' ? 'Online' : 'Offline'}
          </strong>
          <p className="text-sm text-[color:var(--muted)]">
            {status === 'online'
              ? 'Seu backend está respondendo normalmente. Continue monitorando para manter o uptime alto.'
              : 'Identificamos instabilidade no backend. Verifique logs e serviços associados assim que possível.'}
          </p>
        </article>
        <article
          className="flex flex-col justify-center gap-4 rounded-3xl border border-[var(--border-subtle)] bg-card-bg/90 p-6 text-sm shadow-soft transition-all duration-300 animate-fade-in-up motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl"
          style={{ animationDelay: `${(cards.length + 1) * 80}ms` }}
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Insights</span>
            <h2 className="mt-2 text-xl font-semibold text-text-base">Acompanhe a evolução semanal</h2>
          </div>
          <p className="text-sm text-[color:var(--muted)]">
            Consulte relatórios completos no módulo de simulados para identificar tendências de aprovação e quais conteúdos merecem reforço. Use os filtros de período para cruzar os dados com campanhas em andamento.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">Simulados recentes</span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-accent/80">Taxa de aprovação</span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-accent/60">Feedbacks</span>
          </div>
        </article>
      </div>
    </section>
  )
}
