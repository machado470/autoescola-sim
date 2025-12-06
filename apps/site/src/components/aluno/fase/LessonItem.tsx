"use client";

export default function LessonItem({ title, completed }: any) {
  return (
    <div className="p-3 border rounded-lg bg-white shadow-sm flex justify-between items-center">
      <span className="font-medium">{title}</span>
      <span
        className={`px-2 py-1 text-xs rounded ${
          completed ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-600"
        }`}
      >
        {completed ? "Concluída" : "Pendente"}
      </span>
    </div>
  );
}
