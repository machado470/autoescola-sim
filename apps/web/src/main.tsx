import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/quiz/:sessionId", element: <Quiz /> },
  { path: "/resultado/:sessionId", element: <Result /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  const el = document.createElement("div");
  el.id = "root";
  document.body.appendChild(el);
}
createRoot(document.getElementById("root")!).render(<App />);
