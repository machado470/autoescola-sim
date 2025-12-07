import { createBrowserRouter } from "react-router-dom";

import Start from "../pages/Start";
import Login from "../pages/Login";

import AppLayout from "../layout/AppLayout";
import AdminLayout from "../layout/AdminLayout";

import DashboardAluno from "../features/student/DashboardAluno";

import SimuladoHome from "../features/simulado/SimuladoHome";
import SimuladoStart from "../features/simulado/SimuladoStart";
import SimuladoQuestion from "../features/simulado/SimuladoQuestion";
import SimuladoResult from "../features/simulado/SimuladoResult";

import Dashboard from "../pages/admin/Dashboard";
import Categorias from "../pages/admin/Categorias";
import Fases from "../pages/admin/Fases";
import Aulas from "../pages/admin/Aulas";
import Questoes from "../pages/admin/Questoes";
import Alunos from "../pages/admin/Alunos";

import { RequireAuth } from "./RequireAuth";

export const router = createBrowserRouter([
  { path: "/", element: <Start /> },
  { path: "/login", element: <Login /> },

  // ADMIN
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "categorias", element: <Categorias /> },
      { path: "fases", element: <Fases /> },
      { path: "aulas", element: <Aulas /> },
      { path: "questoes", element: <Questoes /> },
      { path: "alunos", element: <Alunos /> },
    ],
  },

  // ALUNO
  {
    path: "/aluno",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardAluno /> },
      { path: "simulado", element: <SimuladoHome /> },
      { path: "simulado/start", element: <SimuladoStart /> },
      { path: "simulado/pergunta", element: <SimuladoQuestion /> },
      { path: "simulado/resultado", element: <SimuladoResult /> },
    ],
  },
]);
