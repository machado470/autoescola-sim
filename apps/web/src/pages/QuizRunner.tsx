import { useEffect, useMemo, useState } from "react";
import { getRandomByCategory, Question } from "../lib/api";
import RouteTransition from "../ui/RouteTransition";

function slugToCategoryId(slug?: string | null) {
  if (!slug) return 0;
  const s = slug.toLowerCase();
  if (s.includes("sinaliz")) return 1;
  if (s.includes("dire")) return 2;
  if (s.includes("mec")) return 3;
  return 0;
}

export default function QuizRunner() {
  const parts = typeof window !== "undefined" ? window.location.pathname.split("/").filter(Boolean) : [];
  const slug = parts.at(-1) ?? null;
  const categoryId = useMemo(() => slugToCategoryId(slug), [slug]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState<Question[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const total = q.length;

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);
    if (!categoryId) { setErr("Categoria inválida"); setLoading(false); return; }
    getRandomByCategory(categoryId, 10)
      .then(data => { if (alive){ setQ(data); setI(0); setScore(0); }})
      .catch(e => setErr(e.message ?? "Falha ao carregar"))
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [categoryId]);

  if (loading) return <div className="container">Carregando perguntas…</div>;
  if (err) return <div className="container">Erro: {err}</div>;
  if (!total) return <div className="container">Sem perguntas para esta categoria.</div>;

  const cur = q[i];
  const done = i >= total;

  function choose(ansId: number) {
    const a = cur.answers.find(a => a.id === ansId);
    if (a?.isCorrect) setScore(s => s + 1);
    setTimeout(() => setI(x => Math.min(total, x + 1)), 120);
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <RouteTransition>
        <div className="container">
          <h1>Resultado</h1>
          <div className="card" style={{maxWidth: 560}}>
            <p>Acertos: <b>{score}</b> de {total} ({pct}%)</p>
            <div className="progress"><div className="bar" style={{["--value" as any]: `${pct}%`}}/></div>
            <div style={{marginTop:16, display:"flex", gap:12}}>
              <button onClick={() => window.history.back()} className="ghost">← Voltar</button>
              <button onClick={() => location.reload()}>Refazer</button>
            </div>
          </div>
        </div>
      </RouteTransition>
    );
  }

  return (
    <RouteTransition>
      <div className="container">
        <h1>Quiz — {slug?.replaceAll("-", " ")}</h1>
        <div style={{opacity:.75, marginBottom:8}}>Pergunta {i+1} / {total}</div>
        <div className="progress" style={{marginBottom:16}}>
          <div className="bar" style={{["--value" as any]: `${((i)/total)*100}%`}}/>
        </div>

        <div className="card" style={{maxWidth: 720}}>
          {cur.image ? <img src={cur.image} alt="" style={{maxWidth:120, display:"block", marginBottom:12}}/> : null}
          <h2 style={{marginTop:0}}>{cur.statement}</h2>
          <div style={{display:"grid", gap:12, marginTop:12}}>
            {cur.answers.map(a => (
              <button key={a.id} onClick={() => choose(a.id)}>{a.text}</button>
            ))}
          </div>
        </div>

        <div style={{marginTop:16}}>
          <button className="ghost" onClick={() => setI(Math.max(0, i-1))}>← Anterior</button>
        </div>
      </div>
    </RouteTransition>
  );
}
