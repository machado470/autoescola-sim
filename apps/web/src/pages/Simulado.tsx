import { useEffect, useState } from "react";
import { api } from "../lib/api";

type QuizQuestion = {
  id: number;
  enunciado?: string;
  texto?: string;
  alternativas?: { id: number; texto: string }[];
};

export default function Simulado() {
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"unauthorized"|"error">("idle");
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setStatus("loading");
      try {
        // tenta pegar pergunta aleatória
        const r = await api("/quiz/random");
        if (r.status === 401 || r.status === 403) {
          setStatus("unauthorized");
          return;
        }
        if (!r.ok) {
          throw new Error(`/quiz/random -> ${r.status} ${r.statusText}`);
        }
        const data = await r.json();
        setQuestion(data);
        setStatus("ok");
      } catch (e:any) {
        // fallback: checa saúde da API para diferenciar falha de auth vs. backend
        try {
          await api("/health");
          // se health ok mas quiz falhou, mantém erro específico
          setError(e?.message || "Falha ao carregar o simulado.");
          setStatus("error");
        } catch {
          setError("A API parece indisponível. Verifique o container da API.");
          setStatus("error");
        }
      }
    };
    run();
  }, []);

  if (status === "loading") return <div style={{padding:"2rem"}}>⏳ Carregando simulado...</div>;
  if (status === "unauthorized") return (
    <div style={{padding:"2rem"}}>
      <h1>🔒 Simulado requer login</h1>
      <p>O endpoint de simulado está protegido. Faça login para continuar.</p>
      <p>
        Se já existir um usuário seed (<code>admin@local</code>), autentique no endpoint <code>/auth/login</code> e use o token JWT no front (a integração de login virá depois).
      </p>
    </div>
  );
  if (status === "error") return (
    <div style={{padding:"2rem"}}>
      <h1>⚠️ Erro</h1>
      <pre style={{whiteSpace:"pre-wrap"}}>{error}</pre>
    </div>
  );

  return (
    <div style={{ padding:"2rem" }}>
      <h1>📝 Simulado</h1>
      {!question ? <p>Nenhuma questão carregada.</p> : (
        <div>
          <h3>Pergunta #{question.id}</h3>
          <p style={{fontSize:"1.1rem"}}>
            {question.enunciado ?? question.texto ?? "Pergunta sem texto"}
          </p>
          <ul>
            {(question.alternativas || []).map(a => (
              <li key={a.id}>• {a.texto}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
