"use client";

import { useEffect, useState, useTransition } from "react";
import { getLesson } from "../../hooks/useLesson";
import { getLessonProgress, startLesson, finishLesson } from "../../hooks/useLessonProgress";

export default function LessonPage({ params }: any) {
  const lessonId = params.lessonId;

  const [lesson, setLesson] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [pending, start] = useTransition();

  // carregar lição + progresso
  useEffect(() => {
    async function load() {
      const data = await getLesson(lessonId);
      setLesson(data);

      const prog = await getLessonProgress();
      const lp = prog.find((p: any) => p.lessonId === lessonId);

      if (!lp) {
        const created = await startLesson(lessonId);
        setProgress(created);
      } else {
        setProgress(lp);
      }
    }

    load();
  }, [lessonId]);

  if (!lesson || !progress) return <p className="p-6">Carregando...</p>;

  const completed = progress.completed === true;

  function concluir() {
    start(async () => {
      await finishLesson(progress.id);

      window.location.href = `/estudos/fase/${lesson.phaseId}`;
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-gray-700 mb-6">{lesson.description}</p>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-800 whitespace-pre-wrap">{lesson.content}</p>
      </div>

      {completed ? (
        <p className="text-green-600 font-semibold mt-6">Lição concluída ✔</p>
      ) : (
        <button
          onClick={concluir}
          disabled={pending}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {pending ? "Salvando..." : "Concluir Lição"}
        </button>
      )}
    </div>
  );
}
