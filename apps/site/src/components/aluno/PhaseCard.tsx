"use client";

import ProgressBar from "./ProgressBar";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  percent: number;
  totalLessons: number;
  totalQuestions: number;
  lessonsCompleted: number;
  correctAnswers: number;
}

export default function PhaseCard({
  id,
  name,
  percent,
  totalLessons,
  totalQuestions,
  lessonsCompleted,
  correctAnswers,
}: Props) {
  const completed = lessonsCompleted + correctAnswers;
  const total = totalLessons + totalQuestions;

  return (
    <Link href={`/aluno/fase/${id}`} className="block">
      <div className="p-4 rounded-lg shadow bg-white hover:scale-[1.01] transition">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>

        <ProgressBar progress={percent} />

        <p className="text-sm text-gray-600 mt-2">
          {completed}/{total} concluído • {lessonsCompleted} aulas •{" "}
          {correctAnswers} acertos
        </p>
      </div>
    </Link>
  );
}
