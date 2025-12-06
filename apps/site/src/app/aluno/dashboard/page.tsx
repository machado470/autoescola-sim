"use client";

import useAlunoDashboard from "@/hooks/useAlunoDashboard";
import UserHeader from "@/components/aluno/UserHeader";
import PhaseCard from "@/components/aluno/PhaseCard";

const USER_ID = "aluno-temp-001";

export default function DashboardAluno() {
  const { loading, user, phases } = useAlunoDashboard(USER_ID);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <UserHeader name={user?.name} xp={user?.xp ?? 0} />

      <h2 className="text-xl font-bold mt-6 mb-4">Seu Progresso</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {phases.map((phase: any) => (
          <PhaseCard
            key={phase.id}
            id={phase.id}
            name={phase.name}
            percent={phase.percent}
            totalLessons={phase.totalLessons}
            totalQuestions={phase.totalQuestions}
            lessonsCompleted={phase.lessonsCompleted}
            correctAnswers={phase.correctAnswers}
          />
        ))}
      </div>
    </div>
  );
}
