import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Home</h1>
      <p className="text-slate-600">Se você está vendo isso, o Router está OK.</p>
    </div>
  );
}

function AppLayout() {
  const userJson = typeof window !== "undefined" ? localStorage.getItem("aes_user") : null;
  const user = userJson ? JSON.parse(userJson) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b flex items-center justify-between px-6 bg-white">
        <h1 className="font-semibold text-slate-900">AutoEscola-Sim</h1>
        <div className="text-sm text-slate-500">
          {user ? `Olá, ${user.name}` : "Aluno"}
        </div>
      </header>
      <main className="flex-1 p-6 bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Simulados disponíveis</h2>
        <p className="text-slate-600 text-sm mb-4">
          Aqui vai entrar a lista vinda de <code>/simulator</code>.
        </p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-2">Simulado de placas</h3>
            <p className="text-sm text-slate-500 mb-3">20 questões</p>
            <button className="px-3 py-1 rounded bg-purple-600 text-white text-sm">
              Iniciar
            </button>
          </div>
        </div>
      </main>
      <footer className="h-10 flex items-center justify-center text-xs text-slate-400 bg-white">
        AutoEscola-Sim • MV2
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
