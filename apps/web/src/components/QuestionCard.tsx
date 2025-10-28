import React from "react";

type Choice = { id: string; text: string };
export type Question = {
  id: string;
  statement: string;
  choices: Choice[];
  selectedChoiceId?: string;
};

type Props = {
  question: Question;
  onSelect: (choiceId: string) => void;
  disabled?: boolean;
};

export default function QuestionCard({ question, onSelect, disabled }: Props) {
  return (
    <div className="w-full max-w-3xl rounded-2xl border p-6 shadow-sm bg-white/5 backdrop-blur">
      <h2 className="text-xl font-semibold mb-4">{question.statement}</h2>
      <div className="space-y-2">
        {question.choices.map((c) => {
          const selected = question.selectedChoiceId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              disabled={disabled}
              className={`w-full text-left rounded-xl border px-4 py-3 transition
                ${selected ? "border-emerald-400 ring-2 ring-emerald-400/30" : "border-white/10 hover:border-white/30"}`}
            >
              {c.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
