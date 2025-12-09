import React from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { colors } from "../../design/colors";

export default function LandingPage() {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: palette.background,
        color: palette.text,
        textAlign: "center",
      }}
    >
      {/* Mascote */}
      <div style={{ fontSize: "64px", marginBottom: "20px" }}>🚧</div>

      {/* Título */}
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
        AutoEscola-Sim
      </h1>

      {/* Subtítulo */}
      <p style={{ fontSize: "1rem", color: palette.textSecondary, marginBottom: "30px" }}>
        Treine. Aprenda. Passe na Prova.
      </p>

      {/* Card CTA */}
      <Card style={{ width: "100%", maxWidth: "360px", textAlign: "center" }}>
        <Button
          onClick={() => (window.location.href = "/login")}
        >
          Começar Agora
        </Button>
      </Card>
    </div>
  );
}
