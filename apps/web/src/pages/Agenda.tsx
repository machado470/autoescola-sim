import { isAxiosError, type AxiosResponse } from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../lib/apiClient'

type AulaStatus = 'AGENDADA' | 'CONCLUIDA' | 'CANCELADA'

type AulaItem = {
  id: string
  data: string
  status: AulaStatus
  aluno: { id: string; nome: string }
  instrutor: { id: string; nome: string }
}

type AulasListResponse = {
  aulas?: AulaItem[]
  message?: string
}

type AulaActionResponse = {
  aula?: AulaItem
  message: string
}

type SelectOption = {
  id: string
  nome: string
}

type ToastState = {
  type: 'success' | 'error'
  message: string
}

const dayFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
})

const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})

function formatDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDayLabel(date: Date): string {
  const label = dayFormatter.format(date)
  return label.charAt(0).toUpperCase() + label.slice(1)
}

function formatTimeLabel(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return '--:--'
  }
  return timeFormatter.format(date)
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

function parseUnknownError(error: unknown, fallback: string): string {
  if (isAxiosError(error) && error.message) {
    return error.message
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return fallback
}

const statusLabels: Record<AulaStatus, string> = {
  AGENDADA: 'Agendada',
  CONCLUIDA: 'Concluída',
  CANCELADA: 'Cancelada',
}

const statusStyles: Record<AulaStatus, string> = {
  AGENDADA:
    'bg-amber-100/80 text-amber-900 ring-1 ring-amber-300/60 dark:bg-amber-500/10 dark:text-amber-200',
  CONCLUIDA:
    'bg-emerald-100/80 text-emerald-900 ring-1 ring-emerald-300/60 dark:bg-emerald-500/10 dark:text-emerald-200',
  CANCELADA:
    'bg-rose-100/80 text-rose-900 ring-1 ring-rose-300/60 dark:bg-rose-500/10 dark:text-rose-200',
}

export default function Agenda() {
  const days = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Array.from({ length: 8 }, (_, index) => {
      const next = new Date(today)
      next.setDate(today.getDate() + index)
      return next
    })
  }, [])

  const fromDate = useMemo(() => formatDateKey(days[0]), [days])
  const toDate = useMemo(
    () => formatDateKey(days[days.length - 1]),
    [days],
  )

  const [instrutorId, setInstrutorId] = useState('')
  const [alunoId, setAlunoId] = useState('')
  const [instrutores, setInstrutores] = useState<SelectOption[]>([])
  const [alunos, setAlunos] = useState<SelectOption[]>([])
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [agendaLoading, setAgendaLoading] = useState(true)
  const [aulas, setAulas] = useState<AulaItem[]>([])
  const [infoMessage, setInfoMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)

  useEffect(() => {
    let timeout: number | undefined

    if (toast) {
      timeout = window.setTimeout(() => {
        setToast(null)
      }, 4000)
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout)
      }
    }
  }, [toast])

  useEffect(() => {
    let active = true

    async function loadOptions() {
      setOptionsLoading(true)
      setError(null)

      try {
        const [instrutoresResponse, alunosResponse] = await Promise.all([
          apiFetch<SelectOption[]>('/instrutores'),
          apiFetch<SelectOption[]>('/alunos'),
        ])

        if (!active) {
          return
        }

        if (instrutoresResponse.status >= 400) {
          throw new Error(readErrorMessage(instrutoresResponse))
        }

        if (alunosResponse.status >= 400) {
          throw new Error(readErrorMessage(alunosResponse))
        }

        const instrutoresData = Array.isArray(instrutoresResponse.data)
          ? (instrutoresResponse.data as SelectOption[])
          : []
        const alunosData = Array.isArray(alunosResponse.data)
          ? (alunosResponse.data as SelectOption[])
          : []

        setInstrutores(
          instrutoresData.map((instrutor) => ({
            id: instrutor.id,
            nome: instrutor.nome,
          })),
        )
        setAlunos(
          alunosData.map((aluno) => ({
            id: aluno.id,
            nome: aluno.nome,
          })),
        )
      } catch (err) {
        if (!active) {
          return
        }
        setError(
          parseUnknownError(
            err,
            'Não foi possível carregar os filtros de agenda.',
          ),
        )
      } finally {
        if (active) {
          setOptionsLoading(false)
        }
      }
    }

    loadOptions()

    return () => {
      active = false
    }
  }, [])

  const loadAgenda = useCallback(async () => {
    setAgendaLoading(true)
    setError(null)
    setInfoMessage(null)

    try {
      const params = new URLSearchParams({ from: fromDate, to: toDate })

      if (instrutorId) {
        params.append('instrutorId', instrutorId)
      }

      if (alunoId) {
        params.append('alunoId', alunoId)
      }

      const response = await apiFetch<AulasListResponse>(
        `/aulas?${params.toString()}`,
      )

      if (response.status >= 400) {
        throw new Error(readErrorMessage(response))
      }

      const responseData = response.data
      const aulasData = Array.isArray(responseData?.aulas)
        ? responseData?.aulas
        : []

      setAulas(aulasData)

      const message = responseData?.message
      setInfoMessage(
        message ??
          (aulasData.length === 0
            ? 'Nenhuma aula agendada para os próximos dias.'
            : null),
      )
    } catch (err) {
      setAulas([])
      setError(
        parseUnknownError(
          err,
          'Não foi possível carregar a agenda no momento.',
        ),
      )
    } finally {
      setAgendaLoading(false)
    }
  }, [alunoId, fromDate, instrutorId, toDate])

  useEffect(() => {
    void loadAgenda()
  }, [loadAgenda])

  const handleActionFeedback = useCallback(
    (message: string, type: ToastState['type']) => {
      setToast({ message, type })
    },
    [],
  )

  const handleConcluir = useCallback(
    async (aulaId: string) => {
      setActionLoadingId(aulaId)
      try {
        const response = await apiFetch<AulaActionResponse>(
          `/aulas/${aulaId}/concluir`,
          { method: 'PATCH' },
        )

        if (response.status >= 400) {
          throw new Error(readErrorMessage(response))
        }

        const data = response.data
        const message = data?.message ?? 'Aula atualizada com sucesso.'
        const type: ToastState['type'] =
          data?.aula?.status === 'CONCLUIDA' ? 'success' : 'error'

        handleActionFeedback(message, type)
        await loadAgenda()
      } catch (err) {
        handleActionFeedback(
          parseUnknownError(err, 'Não foi possível concluir a aula.'),
          'error',
        )
      } finally {
        setActionLoadingId(null)
      }
    },
    [handleActionFeedback, loadAgenda],
  )

  const handleCancelar = useCallback(
    async (aulaId: string) => {
      setActionLoadingId(aulaId)
      try {
        const response = await apiFetch<AulaActionResponse>(
          `/aulas/${aulaId}/cancelar`,
          { method: 'PATCH' },
        )

        if (response.status >= 400) {
          throw new Error(readErrorMessage(response))
        }

        const data = response.data
        const message = data?.message ?? 'Aula atualizada com sucesso.'
        const type: ToastState['type'] =
          data?.aula?.status === 'CANCELADA' ? 'success' : 'error'

        handleActionFeedback(message, type)
        await loadAgenda()
      } catch (err) {
        handleActionFeedback(
          parseUnknownError(err, 'Não foi possível cancelar a aula.'),
          'error',
        )
      } finally {
        setActionLoadingId(null)
      }
    },
    [handleActionFeedback, loadAgenda],
  )

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Agenda</h1>
        <p className="text-sm text-[color:var(--muted)]">
          Acompanhe as aulas práticas agendadas para hoje e os próximos dias.
        </p>
      </header>

      {toast && (
        <div
          role="status"
          className={`fixed right-6 top-6 z-50 max-w-sm rounded-2xl px-4 py-3 text-sm shadow-lg transition-opacity ${
            toast.type === 'success'
              ? 'bg-emerald-500 text-white'
              : 'bg-rose-500 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-6 shadow-sm shadow-black/5 backdrop-blur sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-text-base">
            Instrutor
            <select
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-white/80 px-4 py-2 text-sm text-text-base shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 dark:bg-slate-900/60"
              value={instrutorId}
              onChange={(event) => setInstrutorId(event.target.value)}
              disabled={optionsLoading}
            >
              <option value="">Todos os instrutores</option>
              {instrutores.map((instrutor) => (
                <option key={instrutor.id} value={instrutor.id}>
                  {instrutor.nome}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-text-base">
            Aluno
            <select
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-white/80 px-4 py-2 text-sm text-text-base shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 dark:bg-slate-900/60"
              value={alunoId}
              onChange={(event) => setAlunoId(event.target.value)}
              disabled={optionsLoading}
            >
              <option value="">Todos os alunos</option>
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </option>
              ))}
            </select>
          </label>
        </div>

        {optionsLoading && (
          <p className="mt-4 text-sm text-[color:var(--muted)]">
            Carregando filtros...
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-3xl border border-rose-200/70 bg-rose-100/70 px-4 py-3 text-sm text-rose-900 shadow-sm dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-100">
          {error}
        </div>
      )}

      {infoMessage && !agendaLoading && !error && (
        <div className="rounded-3xl border border-blue-200/60 bg-blue-100/70 px-4 py-3 text-sm text-blue-900 shadow-sm dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-100">
          {infoMessage}
        </div>
      )}

      {agendaLoading ? (
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-6 text-sm text-[color:var(--muted)] shadow-sm shadow-black/5">
          Carregando agenda...
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {days.map((day) => {
            const dayKey = formatDateKey(day)
            const aulasDoDia = aulas.filter((aula) => {
              const aulaDate = new Date(aula.data)
              return formatDateKey(aulaDate) === dayKey
            })

            return (
              <article
                key={dayKey}
                className="flex flex-col gap-4 rounded-3xl border border-[var(--border-subtle)] bg-card-bg/90 p-5 shadow-sm shadow-black/5"
              >
                <header className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-text-base">
                    {formatDayLabel(day)}
                  </h2>
                  <span className="rounded-full bg-[color:var(--border-subtle)]/40 px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                    {aulasDoDia.length} aulas
                  </span>
                </header>

                {aulasDoDia.length === 0 ? (
                  <p className="text-sm text-[color:var(--muted)]">
                    Nenhuma aula programada.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {aulasDoDia.map((aula) => (
                      <li
                        key={aula.id}
                        className="rounded-2xl border border-[color:var(--border-subtle)] bg-white/70 p-4 text-sm shadow-sm transition dark:bg-slate-900/40"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 font-semibold text-text-base">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                                {formatTimeLabel(aula.data)}
                              </span>
                              <span>{aula.aluno.nome}</span>
                            </div>
                            <p className="text-xs text-[color:var(--muted)]">
                              Instrutor: {aula.instrutor.nome}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {aula.status === 'AGENDADA' ? (
                              <>
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-900"
                                  onClick={() => handleConcluir(aula.id)}
                                  disabled={actionLoadingId === aula.id}
                                >
                                  {actionLoadingId === aula.id
                                    ? 'Salvando...'
                                    : 'Concluir'}
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center rounded-2xl bg-rose-500 px-3 py-2 text-xs font-semibold text-white shadow transition hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-900"
                                  onClick={() => handleCancelar(aula.id)}
                                  disabled={actionLoadingId === aula.id}
                                >
                                  {actionLoadingId === aula.id
                                    ? 'Cancelando...'
                                    : 'Cancelar'}
                                </button>
                              </>
                            ) : (
                              <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[aula.status]}`}
                              >
                                {statusLabels[aula.status]}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
