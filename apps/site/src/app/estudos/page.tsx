import { getPhases } from "./hooks/usePhases";

export default async function EstudosPage() {
  let phases = [];

  try {
    phases = await getPhases();
  } catch (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Estudos</h1>
        <p className="text-red-600">Erro ao carregar as fases.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Estudos</h1>

      <ul className="list-disc ml-6 space-y-2">
        {phases.map((phase: any) => (
          <li key={phase.id}>
            {phase.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
