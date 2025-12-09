import React from "react";
import { colors } from "../../design/colors";

export default function Button({ children, onClick, style = {}, disabled }) {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: palette.primary,
        color: "#FFF",
        padding: "14px 18px",
        borderRadius: "12px",
        border: "none",
        fontSize: "1rem",
        width: "100%",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
