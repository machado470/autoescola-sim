import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../modules/landing/LandingPage";
import Login from "../modules/auth/Login";
import StudentDashboard from "../modules/student/StudentDashboard";
import AdminDashboard from "../modules/admin/AdminDashboard";

import RequireAuth from "./RequireAuth";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rota pública */}
        <Route path="/" element={<LandingPage />} />

        {/* Login público */}
        <Route path="/login" element={<Login />} />

        {/* ÁREA DO ALUNO */}
        <Route
          path="/aluno"
          element={
            <RequireAuth allowed={["STUDENT"]}>
              <StudentDashboard />
            </RequireAuth>
          }
        />

        {/* ÁREA DO ADMIN */}
        <Route
          path="/admin"
          element={
            <RequireAuth allowed={["ADMIN"]}>
              <AdminDashboard />
            </RequireAuth>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
