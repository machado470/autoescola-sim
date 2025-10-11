/** App Shell com roteamento, autenticação e tema responsivo. */
import { NavLink, RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'

type NavigationItem = {
  to: string
  label: string
  icon: string
  requiresAuth?: boolean
}

const navigationItems: NavigationItem[] = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/trilhas', label: 'Trilhas', icon: '🛣️' },
  { to: '/simulado/a', label: 'Simulados', icon: '🧠' },
  { to: '/dashboard', label: 'Dashboard', icon: '📊', requiresAuth: true },
  { to: '/perfil', label: 'Perfil', icon: '👤', requiresAuth: true },
  { to: '/instrutor', label: 'Instrutor', icon: '🧑‍🏫', requiresAuth: true },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-card-bg/80 text-lg transition-all duration-300 hover:scale-105 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
      aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
    >
      {theme === 'dark' ? '🌙' : '🌞'}
    </button>
  )
}

function AppShell() {
  const { isAuthenticated, logout } = useAuth()
  const items = navigationItems.filter((item) => !item.requiresAuth || isAuthenticated)

  return (
    <div className="min-h-screen bg-bg-base text-text-base transition-colors duration-500">
      <div className="grid min-h-screen grid-cols-[4.25rem,1fr] bg-[var(--bg-base)] lg:grid-cols-[17rem,1fr]">
        <aside className="relative z-10 flex flex-col border-r border-[var(--border-subtle)] bg-card-bg/70 backdrop-blur transition-[width,transform] duration-500">
          <div className="flex h-16 items-center justify-center border-b border-[var(--border-subtle)] px-2 lg:justify-start lg:px-6">
            <span className="text-xl">🚗</span>
            <span className="ml-2 hidden text-sm font-semibold tracking-wide lg:inline">AutoEscola Sim</span>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-1 py-4 sm:px-2 lg:px-4">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-2xl px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-200 sm:px-3 lg:text-sm lg:normal-case lg:tracking-normal',
                    'hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
                    isActive
                      ? 'bg-accent/15 text-accent shadow-sm'
                      : 'text-[color:var(--muted)] hover:text-text-base',
                  ].join(' ')
                }
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/5 text-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/10 lg:text-xl">
                  {item.icon}
                </span>
                <span className="hidden whitespace-nowrap lg:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border-subtle)] bg-card-bg/70 px-4 py-3 backdrop-blur transition-colors duration-300 sm:px-6">
            <span className="text-base font-semibold lg:hidden">AutoEscola Sim</span>
            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
              <ThemeToggle />
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-accent/60 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                >
                  Sair
                </button>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
              <RouterProvider router={router} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </ThemeProvider>
  )
}
