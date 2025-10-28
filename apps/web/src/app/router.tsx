import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div style={{padding:20}}>⚠️ Rota não encontrada.</div>,
    children: [
      { index: true, element: <Home /> },
      // rotas futuras: treino, simulado, progresso, revisao, perfil...
    ],
  },
]);
