/** App Shell com roteamento e contexto de autenticação. */
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider, useAuth } from './context/AuthContext'

function AppShell() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          background: '#0f172a',
          color: '#f8fafc',
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600 }}>AutoEscola Sim</span>
        {isAuthenticated && (
          <button
            onClick={logout}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid rgba(248, 250, 252, 0.3)',
              background: 'transparent',
              color: '#f8fafc',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Sair
          </button>
        )}
      </header>
      <main style={{ padding: '24px 0' }}>
        <RouterProvider router={router} />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}
