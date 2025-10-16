import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import type { LoginPayload, LoginResponse } from '../services/auth'
import { login as loginRequest } from '../services/auth'

export type AuthUser = {
  id: string
  name: string
  email: string
  role?: string
}

type AuthContextValue = {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  login: (credentials: LoginPayload) => Promise<void>
  logout: () => void
}

const STORAGE_KEY = 'autoescola-sim.auth'

function readStoredSession(): LoginResponse | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as LoginResponse
  } catch (error) {
    console.warn('Erro ao ler sessão de autenticação', error)
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const stored = typeof window !== 'undefined' ? readStoredSession() : null
  const [token, setToken] = useState<string | null>(stored?.token ?? null)
  const [user, setUser] = useState<AuthUser | null>(stored?.user ?? null)

  const login = useCallback(async (credentials: LoginPayload) => {
    const data = await loginRequest(credentials)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [login, logout, token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext deve ser utilizado dentro de AuthProvider')
  }
  return context
}
