export default function ModuleCard({ title, progress }: any) {
  return (
    <div className="p-5 bg-card rounded-xl border border-border shadow hover:scale-[1.02] transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="w-full bg-bg h-2 rounded-lg overflow-hidden mb-2">
        <div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-text2">{progress}% concluído</p>
    </div>
  );
}
