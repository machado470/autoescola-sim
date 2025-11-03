import React from 'react';

export function StatCard({
  icon,
  title,
  value,
  color = 'yellow',
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color?: 'yellow' | 'green' | 'purple';
}) {
  const colorDot =
    color === 'green' ? 'bg-green-500' : color === 'purple' ? 'bg-purple-500' : 'bg-yellow-400';

  return (
    <div className="flex-1 min-w-[200px] rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 p-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 grid place-items-center">
          {icon}
        </div>
        <div className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{title}</div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className={`inline-block w-3 h-3 rounded-full ${colorDot}`} />
        <div className="text-gray-700 dark:text-gray-300">{value}</div>
      </div>
    </div>
  );
}
