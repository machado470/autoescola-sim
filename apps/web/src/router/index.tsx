import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/auth/Login";
import RequireAuth from "./RequireAuth";

import StudentDashboard from "../modules/student/Dashboard";
import Aulas from "../modules/student/Aulas";
import Simulados from "../modules/student/Simulados";

import AdminDashboard from "../modules/admin/AdminDashboard";
import Alunos from "../modules/admin/Alunos";
import SimuladosAdmin from "../modules/admin/Simulados";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROTA PÚBLICA */}
        <Route path="/login" element={<Login />} />

        {/* ROTAS PROTEGIDAS - ALUNO */}
        <Route
          path="/aluno/dashboard"
          element={
            <RequireAuth>
              <StudentDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/aluno/aulas"
          element={
            <RequireAuth>
              <Aulas />
            </RequireAuth>
          }
        />

        <Route
          path="/aluno/simulados"
          element={
            <RequireAuth>
              <Simulados />
            </RequireAuth>
          }
        />

        {/* ROTAS PROTEGIDAS - ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/alunos"
          element={
            <RequireAuth>
              <Alunos />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/simulados"
          element={
            <RequireAuth>
              <SimuladosAdmin />
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
