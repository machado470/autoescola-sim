import React from "react";
import { colors } from "../../design/colors";

export default function BottomNav() {
  const mode = document.body.dataset.theme || "light";
  const palette = colors[mode];

  const style = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60px",
    background: palette.card,
    borderTop: `1px solid ${palette.border}`,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <span style={{ color: palette.navIcon }}>🚧</span>
      <span style={{ color: palette.navIcon }}>🔍</span>
      <span style={{ color: palette.navIcon }}>👤</span>
    </div>
  );
}
