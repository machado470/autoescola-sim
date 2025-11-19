import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Elemento #root não encontrado no index.html");
  throw new Error("Root não encontrado");
}

createRoot(rootElement).render(<App />);
