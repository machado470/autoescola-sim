import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Simulados from "./pages/Simulados";
import Questoes from "./pages/Questoes";
import Alunos from "./pages/Alunos";
import Relatorios from "./pages/Relatorios";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/simulados" element={<Simulados />} />
          <Route path="/questoes" element={<Questoes />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
