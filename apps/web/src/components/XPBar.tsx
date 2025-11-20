export default function XPBar({ level, xp, next }: any) {
  const percent = Math.min(100, (xp / next) * 100);
  return (
    <div className="w-full bg-surface border border-border p-4 rounded-xl">
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-primary">Nível {level}</span>
        <span className="text-text2">
          {xp}/{next} XP
        </span>
      </div>
      <div className="w-full h-3 bg-bg rounded-lg overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
