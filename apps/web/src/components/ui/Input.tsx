import React from "react";
import { colors } from "../../design/colors";
import { theme } from "../../design/theme";

export default function Input({ placeholder, type, value, onChange }) {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: theme.spacing.md,
        borderRadius: theme.radius.input,
        border: `1px solid ${palette.border}`,
        outline: "none",
        background: palette.card,
        color: palette.text,
        fontSize: "1rem",
      }}
    />
  );
}
