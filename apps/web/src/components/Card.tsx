export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface rounded-2xl p-6 shadow-[0_0_25px_#0004] border border-border">
      {children}
    </div>
  );
}
