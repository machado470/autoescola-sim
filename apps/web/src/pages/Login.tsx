import { FormEvent, useEffect, useState } from 'react'
import type { Location } from 'react-router-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading, error, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const from =
    (location.state as { from?: Location } | undefined)?.from?.pathname ?? '/perfil'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [from, isAuthenticated, navigate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    try {
      await login({ email, senha })
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof Error && err.message) {
        setFormError(err.message)
      } else {
        setFormError('Não foi possível realizar o login. Tente novamente.')
      }
    }
  }

  return (
    <div
      style={{
        maxWidth: 360,
        margin: '64px auto',
        padding: 24,
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        background: '#ffffff',
      }}
    >
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Entrar</h1>
      <p style={{ marginBottom: 24, color: '#475569' }}>
        Acesse sua conta para continuar os estudos.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        <label style={{ display: 'grid', gap: 4 }}>
          <span style={{ fontWeight: 600 }}>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="seu@email.com"
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #cbd5f5',
              fontSize: 16,
            }}
          />
        </label>
        <label style={{ display: 'grid', gap: 4 }}>
          <span style={{ fontWeight: 600 }}>Senha</span>
          <input
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
            placeholder="••••••"
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #cbd5f5',
              fontSize: 16,
            }}
          />
        </label>
        {(formError || error) && (
          <div
            role="alert"
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              background: '#fee2e2',
              color: '#991b1b',
              fontSize: 14,
            }}
          >
            {formError ?? error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            border: 'none',
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            background: loading ? '#94a3b8' : '#2563eb',
            color: '#ffffff',
            transition: 'background 0.2s ease',
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14, color: '#475569' }}>
        Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  )
}
