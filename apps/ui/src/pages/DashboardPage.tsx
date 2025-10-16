import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useAuth } from '../hooks/useAuth'
import { apiRequest } from '../services/api'

const icons = {
  students: '👥',
  instructors: '🧑‍🏫',
  lessons: '🚗'
}

type DashboardCounts = {
  students: number
  instructors: number
  lessons: number
}

export function DashboardPage() {
  const { token } = useAuth()
  const [counts, setCounts] = useState<DashboardCounts>({ students: 0, instructors: 0, lessons: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      if (!token) return
      setLoading(true)
      try {
        const [students, instructors, lessons] = await Promise.all([
          apiRequest<unknown[]>(`/students`, { method: 'GET' }, token),
          apiRequest<unknown[]>(`/instructors`, { method: 'GET' }, token),
          apiRequest<unknown[]>(`/lessons`, { method: 'GET' }, token)
        ])

        setCounts({
          students: students.length,
          instructors: instructors.length,
          lessons: lessons.length
        })
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Não foi possível carregar o painel.'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [token])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Bem-vindo(a)!</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Acompanhe o status geral dos cadastros da AutoEscola Sim.
        </p>
      </div>

      {error ? <p className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-300">{error}</p> : null}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <Card title="Alunos" description={loading ? '...' : counts.students.toString()} icon={icons.students} />
        <Card title="Instrutores" description={loading ? '...' : counts.instructors.toString()} icon={icons.instructors} />
        <Card title="Aulas" description={loading ? '...' : counts.lessons.toString()} icon={icons.lessons} />
      </div>
    </div>
  )
}

export default DashboardPage
