import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "../pages/Home";
import Treino from "../pages/Treino";
import TreinoPlay from "../pages/TreinoPlay";
import Simulado from "../pages/Simulado";
import SimuladoPlay from "../pages/SimuladoPlay";
import SimuladoResultado from "../pages/SimuladoResultado";
import Revisao from "../pages/Revisao";
import Progresso from "../pages/Progresso";
import Perfil from "../pages/Perfil";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "treino", element: <Treino /> },
      { path: "treino/jogar", element: <TreinoPlay /> },
      { path: "simulado", element: <Simulado /> },
      { path: "simulado/fazendo", element: <SimuladoPlay /> },
      { path: "simulado/resultado", element: <SimuladoResultado /> },
      { path: "revisao", element: <Revisao /> },
      { path: "progresso", element: <Progresso /> },
      { path: "perfil", element: <Perfil /> },
    ],
  },
]);
