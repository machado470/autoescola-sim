import { Outlet, NavLink } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";

export default function RootLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <header className="h-12 flex items-center justify-between px-4 border-b">
        <span className="font-semibold">AutoEscola-Sim</span>
        <div className="flex items-center gap-3">
          <NavLink to="/perfil" className="text-sm underline">Perfil</NavLink>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-4">
        <Outlet />
      </main>

      <nav className="h-14 border-t grid grid-cols-4">
        {[
          { to: "/", label: "Home" },
          { to: "/treino", label: "Treino" },
          { to: "/simulado", label: "Simulado" },
          { to: "/progresso", label: "Progresso" },
        ].map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({ isActive }) =>
              `flex items-center justify-center text-sm ${
                isActive ? "font-semibold" : "text-muted-foreground"
              }`
            }
          >
            {i.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
