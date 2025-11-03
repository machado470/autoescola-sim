import React from 'react';

export function QuizOption({
  text,
  state,
  onClick,
}: {
  text: string;
  state?: 'idle' | 'correct' | 'wrong' | 'disabled';
  onClick?: () => void;
}) {
  const base =
    'w-full text-left rounded-2xl border p-4 md:p-5 transition-all focus:outline-none';
  const map = {
    idle: 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-blue-400',
    correct: 'bg-green-50 border-green-600 text-green-900',
    wrong: 'bg-red-50 border-red-500 text-red-900',
    disabled: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-70',
  } as const;
  return (
    <button className={`${base} ${map[state ?? 'idle']}`} disabled={state === 'disabled'} onClick={onClick}>
      <span className="text-lg md:text-xl font-medium">{text}</span>
    </button>
  );
}
