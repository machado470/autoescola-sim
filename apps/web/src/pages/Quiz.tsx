// =========================================
// TELA DE QUIZ COMPLETA (visualmente igual ao layout)
// =========================================
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

const TOTAL = 5;

const slugToCategoryId = (slug: string | null) => {
  if (!slug) return 0;
  const s = slug.toLowerCase();
  if (s.includes("sinaliz")) return 1;
  if (s.includes("dire")) return 2;
  if (s.includes("mec")) return 3;
  return 0;
};

export default function Quiz() {
  const [qs, setQs] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const slug = useMemo(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts.length >= 2 ? parts[1] : null;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const categoryId = slugToCategoryId(slug);
        const base = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

        let url = `${base}/quiz/random?take=${TOTAL}`;
        if (categoryId > 0) {
          url = `${base}/quiz/random-by-category?categoryId=${categoryId}&take=${TOTAL}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("quiz fetch failed");

        const data: Question[] = await res.json();
        setQs(Array.isArray(data) && data.length > 0 ? data.slice(0, TOTAL) : []);
        setStep(0);
        setSelectedIndex(null);
      } catch {
        setQs([
          {
            id: 1,
            statement: "O que esse sinal indica?",
            image: null,
            categoryId: 1,
          },
        ]);
        setStep(0);
        setSelectedIndex(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const current = qs[step];
  const canGoPrev = step > 0;
  const canGoNext = step < TOTAL - 1 && qs.length > 0;

  const handleAnswerClick = (idx: number) => {
    setSelectedIndex(idx);
  };

  return (
    <RouteTransition>
      <div
        style={{
          maxWidth: 420,
          margin: "0 auto",
          padding: "24px 16px 32px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <ConeMascot size={64} />
            <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "#1f2933" }}>
              Quiz
            </h1>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 16, color: "#6b7280", fontWeight: 500 }}>
              Pergunta {Math.min(step + 1, TOTAL)} de {TOTAL}
            </div>

            <ProgressBar value={((step + 1) / TOTAL) * 100} />
          </div>
        </header>

        <main
          style={{
            flex: 1,
            background: "#ffffff",
            borderRadius: 32,
            padding: 24,
            boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 260,
              height: 260,
              display: "grid",
              placeItems: "center",
              background: "#f9fafb",
              borderRadius: 32,
            }}
          >
            {current?.image ? (
              <img
                src={current.image}
                style={{ maxWidth: "80%", maxHeight: "80%" }}
              />
            ) : (
              <span style={{ fontSize: 120 }}>🛑</span>
            )}
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {current?.statement ?? "O que esse sinal indica?"}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            {["Parada obrigatória", "Travessia de pedestres", "Siga em frente"].map(
              (label, idx) => (
                <button
                  key={label}
                  onClick={() => handleAnswerClick(idx)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 18px",
                    borderRadius: 999,
                    border:
                      selectedIndex === idx
                        ? "1px solid #2563eb"
                        : "1px solid #e5e7eb",
                    background: selectedIndex === idx ? "#eff6ff" : "#fff",
                    boxShadow:
                      selectedIndex === idx
                        ? "0 0 0 2px rgba(37,99,235,0.15)"
                        : "0 4px 12px rgba(15,23,42,0.04)",
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#111827",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              )
            )}
          </div>

          {loading && (
            <div style={{ marginTop: 8, fontSize: 14, color: "#6b7280" }}>
              Carregando…
            </div>
          )}
        </main>

        <footer style={{ marginTop: 20 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              disabled={!canGoPrev}
              onClick={() => {
                if (!canGoPrev) return;
                setStep((s) => Math.max(0, s - 1));
                setSelectedIndex(null);
              }}
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                cursor: canGoPrev ? "pointer" : "not-allowed",
                opacity: canGoPrev ? 1 : 0.5,
              }}
            >
              Voltar
            </button>

            <button
              disabled={!canGoNext}
              onClick={() => {
                if (!canGoNext) return;
                setStep((s) => Math.min(TOTAL - 1, s + 1));
                setSelectedIndex(null);
              }}
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 999,
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
                cursor: canGoNext ? "pointer" : "not-allowed",
                opacity: canGoNext ? 1 : 0.6,
              }}
            >
              Próxima
            </button>
          </div>
        </footer>
      </div>
    </RouteTransition>
  );
}
