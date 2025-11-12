#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

echo "📦 Instalando react-router-dom..."
pnpm add react-router-dom

echo "📁 Criando pastas..."
mkdir -p src/routes src/pages/categoria

echo "🛣️  Escrevendo src/routes/index.tsx..."
cat > src/routes/index.tsx <<'TSX'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Categoria from "../pages/categoria/Categoria";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria" element={<Categoria />} />
      </Routes>
    </BrowserRouter>
  );
}
TSX

echo "🏠 Escrevendo src/pages/Home.tsx..."
cat > src/pages/Home.tsx <<'TSX'
export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🏁 AutoEscola-Sim</h1>
      <p>Sistema inicializado com sucesso.</p>
      <p><a href="/categoria">Ir para Categoria ➜</a></p>
    </div>
  );
}
TSX

echo "🚦 Escrevendo src/pages/categoria/Categoria.tsx..."
cat > src/pages/categoria/Categoria.tsx <<'TSX'
export default function Categoria() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚦 Página de Categorias</h1>
      <p>Exemplo de segunda rota React.</p>
      <a href="/">⬅ Voltar</a>
    </div>
  );
}
TSX

echo "🧩 Atualizando src/App.tsx..."
cat > src/App.tsx <<'TSX'
import AppRoutes from "./routes";
export default function App() { return <AppRoutes />; }
TSX

echo "🚀 Subindo Vite..."
pnpm dev --host
