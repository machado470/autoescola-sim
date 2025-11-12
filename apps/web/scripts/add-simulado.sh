#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

# 1) .env do front (base da API)
if [ ! -f .env ]; then
  echo 'VITE_API_URL=http://localhost:3000' > .env
  echo "�� Criado apps/web/.env com VITE_API_URL=http://localhost:3000"
else
  echo "ℹ️  apps/web/.env já existe (mantido)."
fi

# 2) helper de API
mkdir -p src/lib
cat > src/lib/api.ts <<'TS'
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function api<T = any>(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers || {});
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  return fetch(`${API_BASE}${path}`, { ...init, headers });
}
TS
echo "🔧 Escrito src/lib/api.ts"

# 3) página /simulado
mkdir -p src/pages
cat > src/pages/Simulado.tsx <<'TSX'
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
TSX
echo "🧪 Escrito src/pages/Simulado.tsx"

# 4) atualiza rotas (mantém Home e Categoria, adiciona /simulado)
cat > src/routes/index.tsx <<'TSX'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Categoria from "../pages/categoria/Categoria";
import Simulado from "../pages/Simulado";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/simulado" element={<Simulado />} />
      </Routes>
    </BrowserRouter>
  );
}
TSX
echo "🛣️  Atualizado src/routes/index.tsx"

# 5) garante App.tsx apontando para as rotas
cat > src/App.tsx <<'TSX'
import AppRoutes from "./routes";
export default function App() { return <AppRoutes />; }
TSX

echo "🚀 Reiniciando Vite (use Ctrl+C para parar)..."
pnpm dev --host
