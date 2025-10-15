import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type HealthResponse = {
  status: string
}

function App() {
  const [status, setStatus] = useState<string>('unknown')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchHealth = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/health')
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data: HealthResponse = await response.json()
      setStatus(data.status)
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setStatus('error')
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchHealth()
  }, [fetchHealth])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Autoescola UI</h1>
      <div className="card">
        <button type="button" onClick={() => void fetchHealth()} disabled={isLoading}>
          {isLoading ? 'Checking…' : 'Recheck API health'}
        </button>
        <p>
          API status: <strong>{status}</strong>
        </p>
        {error ? <p role="alert">Erro ao consultar API: {error}</p> : null}
      </div>
      <p className="read-the-docs">
        A UI está configurada para usar a API local disponível em <code>http://localhost:3000</code>.
      </p>
    </>
  )
}

export default App
