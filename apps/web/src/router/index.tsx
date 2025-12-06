import { createBrowserRouter } from "react-router-dom";

import Start from "../pages/Start";
import Login from "../pages/Login";

import AppLayout from "../layout/AppLayout";
import DashboardAluno from "../features/student/DashboardAluno";

import SimuladoHome from "../features/simulado/SimuladoHome";
import SimuladoStart from "../features/simulado/SimuladoStart";
import SimuladoQuestion from "../features/simulado/SimuladoQuestion";
import SimuladoResult from "../features/simulado/SimuladoResult";

export const router = createBrowserRouter([
  { path: "/", element: <Start /> },
  { path: "/login", element: <Login /> },

  {
    path: "/aluno",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardAluno /> },

      // ROTAS DO SIMULADO
      { path: "simulado", element: <SimuladoHome /> },
      { path: "simulado/start", element: <SimuladoStart /> },
      { path: "simulado/pergunta", element: <SimuladoQuestion /> },
      { path: "simulado/resultado", element: <SimuladoResult /> },
    ],
  },
]);
