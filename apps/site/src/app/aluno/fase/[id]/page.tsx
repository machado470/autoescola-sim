"use client";

import { useParams } from "next/navigation";
import useFaseAluno from "@/hooks/useFaseAluno";
import LessonItem from "@/components/aluno/fase/LessonItem";
import QuestionItem from "@/components/aluno/fase/QuestionItem";

const USER_ID = "aluno-temp-001";

export default function FasePage() {
  const { id } = useParams();
  const { loading, fase } = useFaseAluno(USER_ID, id as string);

  if (loading) return <p>Carregando fase...</p>;
  if (!fase) return <p>Fase não encontrada.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{fase.name}</h1>

      <h2 className="text-lg font-semibold mt-6 mb-2">Suas Aulas</h2>
      <div className="space-y-2">
        {fase.lessons.map((lesson: any) => (
          <LessonItem
            key={lesson.id}
            title={lesson.title}
            completed={lesson.completed}
          />
        ))}
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-2">Questões</h2>
      <div className="space-y-2">
        {fase.questions.map((q: any, i: number) => (
          <QuestionItem key={q.id} index={i + 1} answered={q.answered} />
        ))}
      </div>
    </div>
  );
}
