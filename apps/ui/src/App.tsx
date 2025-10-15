import { useEffect, useState } from 'react'

export default function App() {
  const [status, setStatus] = useState<'loading'|'ok'|'error'>('loading')
  const [info, setInfo] = useState<string>('')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/health')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.text()
        setInfo(data)
        setStatus('ok')
      } catch (e: any) {
        setInfo(e?.message ?? 'erro desconhecido')
        setStatus('error')
      }
    })()
  }, [])

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>AutoEscola • UI</h1>
      <p>Pingando <code>/health</code>…</p>
      <pre
        style={{
          background: '#111', color: '#0f0', padding: 12, borderRadius: 8,
          overflowX: 'auto'
        }}
      >
        {status === 'loading' ? 'carregando…' : info}
      </pre>
      <p style={{opacity:.7}}>
        backend em <code>http://localhost:3000</code> • UI em <code>http://localhost:5173</code>
      </p>
    </main>
  )
}
