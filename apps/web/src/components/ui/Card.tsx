import React from "react";
import { colors } from "../../design/colors";
import { theme } from "../../design/theme";

export default function Card({ children, style = {} }) {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  return (
    <div
      style={{
        background: palette.card,
        borderRadius: theme.radius.card,
        padding: theme.spacing.md,
        boxShadow: mode === "light" ? theme.shadow.card : theme.shadow.cardDark,
        border: `1px solid ${palette.border}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
