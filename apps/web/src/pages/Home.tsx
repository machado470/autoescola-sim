/** Landing com CTA para Trilhas e Simulado. */
const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

export default function Home(){
  return (
    <div style={{ padding: 24 }}>
      <h1>AutoEscola Sim</h1>
      <p>Continue sua jornada: Trilhas, Simulados e Percepção de Risco.</p>

      {import.meta.env.DEV && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: '#eef6ff', color: '#1a365d' }}>
          <strong>API base URL</strong>
          <p style={{ margin: '4px 0 0' }}>{apiUrl}</p>
        </div>
      )}
    </div>
  )
}
