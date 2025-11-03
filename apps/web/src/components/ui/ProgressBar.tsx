import React from 'react';

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={`w-full h-3 rounded-full bg-gray-200 dark:bg-gray-800 ${className}`}>
      <div
        className="h-full rounded-full bg-blue-600 transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
