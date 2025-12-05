"use client";

import useAlunoDashboard from "@/hooks/useAlunoDashboard";
import UserHeader from "@/components/aluno/UserHeader";
import PhaseCard from "@/components/aluno/PhaseCard";

// por enquanto userId fixo até login ficar pronto
const USER_ID = "aluno-temp-001";

export default function DashboardAluno() {
  const { loading, user, phases, progress } = useAlunoDashboard(USER_ID);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <UserHeader name={user?.name} xp={user?.xp ?? 0} />

      <h2 className="text-xl font-bold mb-4">Seu Progresso</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {phases.map((phase: any) => {
          const p = progress.find((x: any) => x.phaseId === phase.id);
          const percent = p
            ? Math.min(
                ((p.lessonsCompleted + p.correctAnswers) / 10) * 100,
                100
              )
            : 0;

          return (
            <PhaseCard
              key={phase.id}
              id={phase.id}
              name={phase.name}
              progress={percent}
            />
          );
        })}
      </div>
    </div>
  );
}
