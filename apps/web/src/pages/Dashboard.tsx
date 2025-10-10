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

  const statusStyles: Record<ApiStatus, { background: string; color: string }> = {
    online: { background: '#dcfce7', color: '#166534' },
    offline: { background: '#fee2e2', color: '#991b1b' },
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Dashboard</h1>
      {loading && <p>Carregando dados...</p>}
      {error && (
        <div
          style={{
            background: '#fef3c7',
            color: '#92400e',
            padding: 12,
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: '#ffffff',
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>
              {card.title}
            </span>
            <strong style={{ fontSize: 32, color: '#0f172a' }}>{card.value}</strong>
          </div>
        ))}
        <div
          style={{
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 8,
            ...statusStyles[status],
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500 }}>Status da API</span>
          <strong style={{ fontSize: 24 }}>
            {status === 'online' ? 'Online' : 'Offline'}
          </strong>
        </div>
      </div>
    </div>
  )
}
