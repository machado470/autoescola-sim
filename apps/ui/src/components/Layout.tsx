import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Button from './Button'
import { useAuth } from '../hooks/useAuth'

const navigation = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/students', label: 'Alunos' },
  { to: '/instructors', label: 'Instrutores' },
  { to: '/schools', label: 'Escolas' },
  { to: '/lessons', label: 'Aulas' }
]

export function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-border bg-muted/40 p-6 text-sm lg:flex">
          <div className="mb-10">
            <h1 className="text-xl font-bold text-primary">AutoEscola Sim</h1>
            <p className="mt-2 text-xs text-foreground/60">Painel administrativo</p>
          </div>
          <nav className="flex flex-1 flex-col gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2 font-medium transition ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/70 hover:bg-muted/70 hover:text-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-8 space-y-2 text-xs">
            <p className="text-foreground/60">Conectado como</p>
            <p className="font-medium text-foreground">{user?.name}</p>
            <Button onClick={handleLogout} variant="ghost" className="text-sm text-red-400 hover:text-red-300">
              Sair
            </Button>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border bg-muted/60 px-6 py-4 lg:hidden">
            <div>
              <h1 className="text-lg font-semibold text-primary">AutoEscola Sim</h1>
              <p className="text-xs text-foreground/60">{user?.name}</p>
            </div>
            <Button onClick={handleLogout} variant="ghost" className="text-sm text-red-400 hover:text-red-300">
              Sair
            </Button>
          </header>
          <nav className="flex gap-2 overflow-x-auto border-b border-border bg-muted/40 px-4 py-3 text-sm lg:hidden">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-4 py-2 transition ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted/60'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <main className="flex-1 p-4 sm:p-6 lg:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
