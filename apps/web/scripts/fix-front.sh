#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

# 1) Garante .env do front
[ -f .env ] || echo 'VITE_API_URL=http://localhost:3000' > .env

# 2) Rotas + páginas básicas
mkdir -p src/routes src/pages/categoria

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

# 3) App usa rotas
cat > src/App.tsx <<'TSX'
import AppRoutes from "./routes";
export default function App() { return <AppRoutes />; }
TSX

# 4) main.tsx rende <App />
cat > src/main.tsx <<'TSX'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
TSX

# 5) index.html com <div id="root"></div> e script do main
if ! grep -q 'id="root"' index.html; then
  cat > index.html <<'HTML'
<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AutoEscola-Sim</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTML
fi

# 6) limpa cache do Vite e reinstala deps do app (não do monorepo todo)
rm -rf node_modules/.vite node_modules/.cache 2>/dev/null || true
pnpm install

echo "✅ Front reconfigurado. Subindo Vite..."
pnpm dev --host
