import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/auth/Login";
import StudentHome from "../modules/student/Home";
import StudentDashboard from "../modules/student/Dashboard";
import Simulado from "../modules/student/Simulado";
import ResultadoSimulado from "../modules/student/ResultadoSimulado";
import Ranking from "../modules/student/Ranking";

import RequireAuth from "./RequireAuth";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/aluno/home"
          element={
            <RequireAuth>
              <StudentHome />
            </RequireAuth>
          }
        />

        <Route
          path="/aluno/dashboard"
          element={
            <RequireAuth>
              <StudentDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/aluno/simulado"
          element={
            <RequireAuth>
              <Simulado />
            </RequireAuth>
          }
        />

        <Route
          path="/aluno/simulado/resultado"
          element={
            <RequireAuth>
              <ResultadoSimulado />
            </RequireAuth>
          }
        />

        <Route
          path="/aluno/ranking"
          element={
            <RequireAuth>
              <Ranking />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
