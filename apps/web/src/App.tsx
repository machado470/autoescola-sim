import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Simulado from "./pages/Simulado";
import Dashboard from "./pages/Dashboard";
import SimuladoStart from "./pages/SimuladoStart";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/simulado" element={<Simulado />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/simulado/start" element={<SimuladoStart />} />
    </Routes>
  );
}
