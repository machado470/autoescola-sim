import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import RouteTransition from "./ui/RouteTransition";
import ConeMascot from "./ui/ConeMascot";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh app-bg">
        <div className="mx-auto max-w-md px-4 pb-20 pt-6">
          <header className="mb-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-black tracking-tight">AutoEscola-Sim</Link>
            <nav className="text-sm text-slate-600">
              <Link to="/" className="hover:text-slate-900">Início</Link>
            </nav>
          </header>

          <main>
            <RouteTransition>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/categoria/:slug" element={<Category/>} />
                <Route path="/quiz/:slug" element={<Quiz/>} />
                <Route path="/result" element={<Result/>} />
              </Routes>
            </RouteTransition>
          </main>

          <footer className="text-center text-xs text-slate-500 mt-10">MV1 • AutoEscola-Sim</footer>
        </div>

        <ConeMascot/>
      </div>
    </BrowserRouter>
  );
}
