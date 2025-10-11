import { isAxiosError, type AxiosResponse } from 'axios'
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { apiFetch } from '../lib/apiClient'
import {
  AUTH_TOKEN_KEY,
  clearStoredToken,
  getStoredToken,
  setStoredToken,
} from '../lib/auth-storage'

type LoginPayload = {
  email: string
  senha: string
}

type AuthContextValue = {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (payload: LoginPayload) => Promise<string>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function parseErrorMessage(response: AxiosResponse<unknown>): string {
  const data = response.data as { message?: string | string[] } | undefined
  if (typeof data?.message === 'string') {
    return data.message
  }
  if (Array.isArray(data?.message)) {
    return data.message.join(', ')
  }
  return 'Não foi possível realizar o login. Tente novamente.'
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === AUTH_TOKEN_KEY) {
        setToken(event.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const login = useCallback(async ({ email, senha }: LoginPayload) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiFetch<{ access_token?: string }>('/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: { email, senha },
        withAuth: false,
      })

      if (response.status >= 400) {
        const message = parseErrorMessage(response)
        setError(message)
        throw new Error(message)
      }

      const { data } = response
      if (!data?.access_token) {
        const message = 'Resposta do servidor não contém token.'
        setError(message)
        throw new Error(message)
      }

      setStoredToken(data.access_token)
      setToken(data.access_token)
      setError(null)
      return data.access_token
    } catch (error) {
      let message = 'Não foi possível realizar o login. Tente novamente.'
      if (isAxiosError(error) && error.message) {
        message = error.message
      } else if (error instanceof Error && error.message) {
        message = error.message
      }
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    clearStoredToken()
    setToken(null)
    setError(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      loading,
      error,
      login,
      logout,
    }),
    [token, loading, error, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
