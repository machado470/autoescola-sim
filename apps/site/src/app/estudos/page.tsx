import { getPhases } from "./hooks/usePhases";
import { getPhaseProgress } from "./hooks/usePhaseProgress";
import { PhaseCard } from "./components/PhaseCard";

export default async function EstudosPage() {
  const phases = await getPhases();
  const progress = await getPhaseProgress();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Seus Estudos</h1>

      {phases.length === 0 && (
        <p className="text-gray-600">Nenhuma fase cadastrada.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {phases.map((phase: any) => {
          const p = progress.find((x: any) => x.phaseId === phase.id);

          return (
            <PhaseCard
              key={phase.id}
              phase={phase}
              progress={p}
            />
          );
        })}
      </div>
    </div>
  );
}
