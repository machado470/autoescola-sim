import { useAuth } from "../hooks/useAuth";
import XPBar from "../components/XPBar";
import PhaseCard from "../components/PhaseCard";
import ModuleCard from "../components/ModuleCard";

export default function Dashboard() {
  const { user } = useAuth();

  const phases = [
    { id: 1, title: "Fase 1", progress: 100, unlocked: true },
    { id: 2, title: "Fase 2", progress: 40, unlocked: true },
    { id: 3, title: "Fase 3", progress: 0, unlocked: false },
    { id: 4, title: "Fase 4", progress: 0, unlocked: false },
  ];

  const modules = [
    { id: 1, title: "Legislação", progress: 20 },
    { id: 2, title: "Direção Defensiva", progress: 0 },
    { id: 3, title: "Placas", progress: 10 },
    { id: 4, title: "Meio Ambiente", progress: 0 },
    { id: 5, title: "Primeiros Socorros", progress: 0 },
  ];

  return (
    <div className="min-h-screen bg-bg text-text p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Olá, {user?.email}</h1>
        <p className="text-text2 mt-1">Bem-vindo de volta ao seu painel</p>
        <div className="mt-4">
          <XPBar level={3} xp={120} next={200} />
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Fases do Simulado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phases.map((phase) => (
            <PhaseCard key={phase.id} {...phase} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Aulas Teóricas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module) => (
            <ModuleCard key={module.id} {...module} />
          ))}
        </div>
      </section>
    </div>
  );
}
