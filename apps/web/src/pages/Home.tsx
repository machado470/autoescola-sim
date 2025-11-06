import ProgressBar from "../ui/ProgressBar";
import { useProgressStore } from "../store/progress";

export default function Home() {
  const { progress, xp } = useProgressStore();
  const cards = [
    { slug: "sinalizacao", title: "Sinalização", level: progress["sinalizacao"], emoji: "🛑" },
    { slug: "direcao-defensiva", title: "Direção Defensiva", level: progress["direcao-defensiva"], emoji: "🛞" },
    { slug: "mecanica", title: "Mecânica", level: progress["mecanica"], emoji: "🛠️" },
  ];

  return (
    <div className="mx-auto max-w-md space-y-6">
      <a href="/quiz/sinalizacao" className="btn btn-primary w-full text-lg text-center">Iniciar Simulado</a>

      <section className="card p-4">
        <div className="grid grid-cols-3 gap-3">
          {cards.map((c) => (
            <a key={c.slug} href={`/categoria/${c.slug}`} className="rounded-2xl p-3 border hover:bg-slate-50 transition">
              <div className="text-3xl mb-2">{c.emoji}</div>
              <div className="font-semibold text-sm">{c.title}</div>
              <div className="mt-2"><ProgressBar value={c.level} /></div>
              <div className="mt-1 text-xs text-slate-600">Nível {c.level}%</div>
            </a>
          ))}
        </div>
      </section>

      <section className="card p-4 flex items-center gap-4">
        <div className="text-5xl">🟧</div>
        <div className="flex-1">
          <div className="font-bold">XP</div>
          <div className="mt-2"><ProgressBar value={Math.min(100, (xp % 500) / 5)} /></div>
          <div className="text-sm mt-1 text-slate-600">{xp} XP</div>
        </div>
      </section>
    </div>
  );
}
