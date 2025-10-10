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
    <section className="flex flex-1 items-center justify-center py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-[var(--border-subtle)] bg-card-bg/80 p-6 shadow-2xl shadow-black/5 backdrop-blur sm:p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Entrar</h1>
          <p className="text-sm text-[color:var(--muted)]">
            Acesse sua conta para continuar os estudos.
          </p>
        </div>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-left">
            <span className="text-sm font-medium text-text-base">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="seu@email.com"
              className="w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-base shadow-inner shadow-black/5 transition-all duration-200 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]"
            />
          </label>
          <label className="grid gap-2 text-left">
            <span className="text-sm font-medium text-text-base">Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
              placeholder="••••••"
              className="w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-base shadow-inner shadow-black/5 transition-all duration-200 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]"
            />
          </label>
          {(formError || error) && (
            <div
              role="alert"
              className="rounded-2xl border border-rose-200/80 bg-rose-100/70 px-4 py-3 text-sm text-rose-800 shadow-sm dark:border-rose-400/40 dark:bg-rose-500/10 dark:text-rose-100"
            >
              {formError ?? error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-4 py-3 text-base font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] disabled:cursor-not-allowed disabled:opacity-80"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[color:var(--muted)]">
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="font-semibold text-accent hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  )
}
