import { isAxiosError } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../lib/apiClient'

interface RelatorioProgressoItem {
  alunoId: string
  nome: string
  teoricoPct: number
  aulasPraticas: number
}

type FetchState = 'idle' | 'loading' | 'loaded' | 'error'

function formatPercent(value: number): string {
  const normalized = Math.min(Math.max(value, 0), 1)

  if (!Number.isFinite(normalized) || normalized <= 0) {
    return '0%'
  }

  return (normalized * 100).toLocaleString('pt-BR', {
    minimumFractionDigits: normalized * 100 < 1 ? 2 : 0,
    maximumFractionDigits: 1,
  }) + '%'
}

function parseErrorMessage(error: unknown): string {
  if (isAxiosError(error) && error.response) {
    const data = error.response.data as { message?: string | string[] } | undefined
    if (typeof data?.message === 'string') {
      return data.message
    }
    if (Array.isArray(data?.message)) {
      return data.message.join(', ')
    }
    return `${error.response.status} - ${error.response.statusText ?? ''}`.trim()
  }

  if (isAxiosError(error) && error.message) {
    return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Não foi possível carregar o relatório de progresso.'
}

export default function Relatorios() {
  const [items, setItems] = useState<RelatorioProgressoItem[]>([])
  const [fetchStatus, setFetchStatus] = useState<FetchState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [alunoIdInput, setAlunoIdInput] = useState('')
  const [activeAlunoId, setActiveAlunoId] = useState<string | undefined>(undefined)
  const [nomeFiltro, setNomeFiltro] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadData() {
      setFetchStatus('loading')
      setErrorMessage(null)

      try {
        const response = await apiFetch<RelatorioProgressoItem[]>('/relatorios/progresso', {
          params: activeAlunoId ? { alunoId: activeAlunoId } : undefined,
          withAuth: true,
        })

        if (response.status >= 400) {
          throw new Error('Falha ao consultar relatório de progresso.')
        }

        const data = Array.isArray(response.data) ? response.data : []

        if (isActive) {
          setItems(data)
          setFetchStatus('loaded')
        }
      } catch (error) {
        if (isActive) {
          setItems([])
          setFetchStatus('error')
          setErrorMessage(parseErrorMessage(error))
        }
      }
    }

    loadData()

    return () => {
      isActive = false
    }
  }, [activeAlunoId])

  const filteredItems = useMemo(() => {
    const termo = nomeFiltro.trim().toLowerCase()

    if (!termo) {
      return items
    }

    return items.filter((item) => item.nome.toLowerCase().includes(termo))
  }, [items, nomeFiltro])

  function handleSubmitAlunoId(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = alunoIdInput.trim()
    setActiveAlunoId(trimmed.length > 0 ? trimmed : undefined)
  }

  function handleExportCsv() {
    if (filteredItems.length === 0) {
      return
    }

    const header = ['Aluno', '% Teórico', 'Aulas Práticas']
    const rows = filteredItems.map((item) => [
      item.nome,
      formatPercent(item.teoricoPct),
      item.aulasPraticas.toString(),
    ])

    const csvContent = [header, ...rows]
      .map((row) =>
        row
          .map((cell) => {
            const needsQuote = /[";,\n]/.test(cell)
            const value = cell.replace(/"/g, '""')
            return needsQuote ? `"${value}"` : value
          })
          .join(';'),
      )
      .join('\n')

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: 'text/csv;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'relatorio-progresso.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const isLoading = fetchStatus === 'loading'
  const hasError = fetchStatus === 'error'
  const isEmpty = fetchStatus === 'loaded' && filteredItems.length === 0

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Relatórios</h1>
        <p className="text-sm text-[color:var(--muted)]">
          Acompanhe o progresso teórico e prático de cada aluno matriculado.
        </p>
      </header>

      <div className="flex flex-col gap-4 rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-4 shadow-soft sm:flex-row sm:items-end">
        <form onSubmit={handleSubmitAlunoId} className="flex flex-1 flex-col gap-2 sm:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="alunoId" className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Filtrar por ID do aluno (consulta na API)
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                id="alunoId"
                name="alunoId"
                value={alunoIdInput}
                onChange={(event) => setAlunoIdInput(event.target.value)}
                placeholder="Digite o ID exato do aluno"
                className="w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              >
                Aplicar
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-2">
          <label htmlFor="nomeFiltro" className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Filtrar por nome (client-side)
          </label>
          <input
            id="nomeFiltro"
            name="nomeFiltro"
            value={nomeFiltro}
            onChange={(event) => setNomeFiltro(event.target.value)}
            placeholder="Busque pelo nome do aluno"
            className="w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          {filteredItems.length} {filteredItems.length === 1 ? 'resultado' : 'resultados'}
        </span>
        <button
          type="button"
          onClick={handleExportCsv}
          disabled={filteredItems.length === 0}
          className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-subtle)] px-4 py-2 text-sm font-semibold transition hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Exportar CSV
        </button>
      </div>

      {isLoading && (
        <p className="text-sm text-[color:var(--muted)]">Carregando relatório de progresso...</p>
      )}

      {hasError && errorMessage && (
        <div className="rounded-3xl border border-rose-200/70 bg-rose-100/70 px-4 py-3 text-sm text-rose-900 shadow-sm dark:border-rose-400/40 dark:bg-rose-500/10 dark:text-rose-100">
          {errorMessage}
        </div>
      )}

      {isEmpty && (
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-card-bg/70 px-4 py-12 text-center text-sm text-[color:var(--muted)]">
          Nenhum aluno encontrado com os filtros atuais.
        </div>
      )}

      {!isLoading && !hasError && filteredItems.length > 0 && (
        <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-card-bg/90 shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--border-subtle)] text-left text-sm">
              <thead className="bg-[var(--bg-muted)]/60 text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Aluno</th>
                  <th scope="col" className="px-4 py-3 font-semibold">% Teórico</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Aulas Práticas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-card-bg/40">
                {filteredItems.map((item) => (
                  <tr key={item.alunoId} className="transition-colors hover:bg-accent/10">
                    <td className="px-4 py-3 text-sm font-medium text-text-base">{item.nome}</td>
                    <td className="px-4 py-3 text-sm text-[color:var(--muted)]">{formatPercent(item.teoricoPct)}</td>
                    <td className="px-4 py-3 text-sm text-[color:var(--muted)]">{item.aulasPraticas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
