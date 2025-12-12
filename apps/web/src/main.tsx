import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/index";
import { ThemeProvider } from "./contexts/ThemeProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>
);
