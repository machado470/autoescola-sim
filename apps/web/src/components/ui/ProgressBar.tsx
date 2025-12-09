import React from "react";

export default function ProgressBar({ value, color }) {
  return (
    <div style={{ width: "100%", height: "8px", background: "#DDD", borderRadius: "8px" }}>
      <div
        style={{
          width: `${value}%`,
          height: "8px",
          background: color,
          borderRadius: "8px",
          transition: "0.3s ease",
        }}
      />
    </div>
  );
}
