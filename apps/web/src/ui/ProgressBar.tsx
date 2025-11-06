export default function ProgressBar({
  value,
  animated = false,
  label
}: { value:number; animated?: boolean; label?: string }) {
  return (
    <div className="w-full">
      {label ? <div className="mb-1 text-xs text-slate-600">{label}</div> : null}
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-2 rounded-full bg-brand-blue transition-all ${animated ? "animate-progress-stripes" : ""}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
