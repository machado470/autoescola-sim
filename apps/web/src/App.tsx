import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import RouteTransition from "./ui/RouteTransition";
import SafeRoute from "./ui/SafeRoute";

const Home = lazy(() => import("./pages/Home"));
const Category = lazy(() => import("./pages/Category"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Result = lazy(() => import("./pages/Result"));
const Progresso = lazy(() => import("./pages/Progresso"));
const DebugHub = lazy(() => import("./pages/_DebugHub"));
const Debug = lazy(() => import("./pages/Debug"));

function Fallback() {
  return <div style={{padding:16, fontFamily:"ui-monospace,monospace"}}>Carregando…</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{minHeight:"100dvh", padding:16}}>
        <header style={{marginBottom:16}}>
          <nav style={{display:"flex",gap:12}}>
            <Link to="/">Home</Link>
            <Link to="/categoria/teste">Categoria</Link>
            <Link to="/quiz/demo">Quiz</Link>
            <Link to="/result">Result</Link>
            <Link to="/progresso">Progresso</Link>
            <Link to="/debug">/debug</Link>
          </nav>
        </header>

        <main>
          <RouteTransition>
            <Suspense fallback={<Fallback />}>
              <Routes>
                {/* redireciona a raiz p/ o hub de debug para evitar carregar Home de primeira */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<SafeRoute><Home/></SafeRoute>} />
                <Route path="/categoria/:slug" element={<SafeRoute><Category/></SafeRoute>} />
                <Route path="/quiz/:slug" element={<SafeRoute><Quiz/></SafeRoute>} />
                <Route path="/result" element={<SafeRoute><Result/></SafeRoute>} />
                <Route path="/progresso" element={<SafeRoute><Progresso/></SafeRoute>} />
                <Route path="/debug" element={<SafeRoute><DebugHub/></SafeRoute>} />
                <Route path="/debug/raw" element={<Debug/>} />
                <Route path="*" element={<div style={{padding:16}}>404</div>} />
              </Routes>
            </Suspense>
          </RouteTransition>
        </main>

        <footer style={{marginTop:24, fontSize:12, color:"#64748b"}}>MV1 • AutoEscola-Sim</footer>
      </div>
    </BrowserRouter>
  );
}
