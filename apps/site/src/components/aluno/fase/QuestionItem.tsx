"use client";

export default function QuestionItem({ index, answered }: any) {
  return (
    <div className="p-3 border rounded-lg bg-white shadow-sm flex justify-between items-center">
      <span className="font-medium">Questão {index}</span>
      <span
        className={`px-2 py-1 text-xs rounded ${
          answered ? "bg-blue-200 text-blue-800" : "bg-gray-200 text-gray-600"
        }`}
      >
        {answered ? "Respondida" : "Pendente"}
      </span>
    </div>
  );
}
