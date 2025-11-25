export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-border h-3 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
