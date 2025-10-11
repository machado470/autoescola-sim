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
    <div className="flex min-h-screen bg-bg-base text-text-base transition-colors duration-500">
      <aside className="flex w-16 flex-col border-r border-[var(--border-subtle)] bg-card-bg/60 backdrop-blur transition-all duration-500 md:w-56">
        <div className="flex h-16 items-center justify-center border-b border-[var(--border-subtle)] px-2 md:justify-start md:px-6">
          <span className="text-xl">🚗</span>
          <span className="ml-2 hidden text-sm font-semibold tracking-wide md:inline">AutoEscola Sim</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-2 py-4 md:px-4">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium uppercase tracking-wide transition-all duration-200 md:text-sm md:normal-case md:tracking-normal',
                  'hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
                  isActive
                    ? 'bg-accent/15 text-accent shadow-sm'
                    : 'text-[color:var(--muted)] hover:text-text-base',
                ].join(' ')
              }
            >
              <span className="text-lg md:text-xl">{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border-subtle)] bg-card-bg/70 px-4 py-3 backdrop-blur transition-colors duration-300 sm:px-6">
          <span className="text-base font-semibold md:hidden">AutoEscola Sim</span>
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
