import React, { useEffect, useMemo, useState } from "react";
import ProgressBar from "../ui/ProgressBar";
import ConeMascot from "../ui/ConeMascot";
import RouteTransition from "../ui/RouteTransition";

type Question = {
  id: number;
  statement: string;
  image?: string | null;
  categoryId: number;
};

const slugToCategoryId = (slug: string | null) => {
  if (!slug) return 0;
  const s = slug.toLowerCase();
  if (s.includes("sinaliz")) return 1;
  if (s.includes("dire")) return 2;         // direcao-defensiva
  if (s.includes("mec")) return 3;          // mecanica
  return 0;
};

export default function Quiz() {
  const [qs, setQs] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  const slug = useMemo(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    // /quiz  |  /quiz/sinalizacao
    return parts.length >= 2 ? parts[1] : null;
  }, []);

  const total = 5; // como no mock das imagens

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const id = slugToCategoryId(slug);
        let url = ;
        if (id > 0) {
          url = ;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data: Question[] = await res.json();
        setQs(Array.isArray(data) ? data.slice(0, total) : []);
        setStep(0);
      } catch (e) {
        console.error(e);
        setQs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const current = qs[step];

  return (
    <RouteTransition>
      <div className="screen">
        <header className="screen-header">
          <div className="brand">
            <ConeMascot size={72} />
            <h1 className="title">Quiz</h1>
          </div>
          <div className="progress-wrap">
            <div className="subtitle">Pergunta {Math.min(step + 1, total)} de {total}</div>
            <ProgressBar value={((step + 1) / total) * 100} />
          </div>
        </header>

        <main className="card vstack" style={{ gap: 16, alignItems: "center" }}>
          {/* imagem central (mock STOP) quando não vier image da API */}
          <div style={{
            width: 260, height: 260, display: "grid", placeItems: "center",
            background: "#fff7ed", borderRadius: 28
          }}>
            {current?.image
              ? <img src={current.image} alt="ilustração" style={{ maxWidth: "80%", maxHeight: "80%" }} />
              : <span style={{ fontSize: 120 }}>🛑</span>}
          </div>

          <div className="quiz-qtitle" style={{ textAlign: "center" }}>
            {current?.statement ?? "O que esse sinal indica?"}
          </div>

          {/* Alternativas — nas imagens são 3 botões grandes */}
          <div className="vstack" style={{ gap: 14, width: "100%" }}>
            <button className="answer">Parada obrigatória</button>
            <button className="answer">Travessia de pedestres</button>
            <button className="answer">Siga em frente</button>
          </div>

          {loading && <div className="subtitle" style={{ marginTop: 12 }}>Carregando…</div>}
        </main>

        <footer className="screen-footer">
          <div className="hstack" style={{ gap: 12, justifyContent: "space-between" }}>
            <button className="btn secondary" onClick={() => setStep((s) => Math.max(0, s - 1))}>Voltar</button>
            <button
              className="btn primary"
              onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
            >
              Próxima
            </button>
          </div>
        </footer>
      </div>
    </RouteTransition>
  );
}
TSX

# 3) Sobe o front
pnpm --filter web run dev
