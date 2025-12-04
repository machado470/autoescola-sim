import { getPhases } from "../../hooks/usePhases";
import { getPhaseProgress } from "../../hooks/usePhaseProgress";
import { getLessonsByPhase } from "../../hooks/useLessons";
import { getLessonProgress } from "../../hooks/useLessonProgress";

export default async function PhasePage({ params }: any) {
  const phaseId = params.phaseId;

  const phases = await getPhases();
  const phase = phases.find((p: any) => p.id === phaseId);

  const lessons = await getLessonsByPhase(phaseId);
  const progress = await getPhaseProgress();
  const lessonProgress = await getLessonProgress();

  const phaseProg = progress.find((p: any) => p.phaseId === phaseId);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{phase.title}</h1>
      <p className="text-gray-700 mb-6">{phase.description}</p>

      <h2 className="text-xl font-semibold mb-3">Lições</h2>

      <div className="flex flex-col gap-4">
        {lessons.map((lesson: any) => {
          const lp = lessonProgress.find(
            (p: any) => p.lessonId === lesson.id
          );

          const completed = lp?.completed === true;

          return (
            <div
              key={lesson.id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold">{lesson.title}</h3>
              <p className="text-gray-600">{lesson.description}</p>

              {completed ? (
                <span className="text-green-600 font-semibold">Concluída ✔</span>
              ) : (
                <a
                  href={`/estudos/licao/${lesson.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Iniciar lição →
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Botão do Quiz */}
      <div className="mt-10">
        {lessons.length > 0 &&
        lessons.every((l: any) =>
          lessonProgress.some((p: any) => p.lessonId === l.id && p.completed)
        ) ? (
          <a
            href={`/estudos/quiz/${phaseId}`}
            className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
          >
            Iniciar Quiz
          </a>
        ) : (
          <p className="text-gray-500 mt-4">
            Conclua todas as lições para liberar o quiz.
          </p>
        )}
      </div>
    </div>
  );
}
