import React from "react";
export function BigButton({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "18px 20px", margin: "10px 0",
        background: "#f8fafc", border: "1px solid #dbe3ea",
        borderRadius: 16, fontSize: 24, textAlign: "left", cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}
