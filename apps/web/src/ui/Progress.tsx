import React from "react";
export function Progress({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div style={{height: 10, background: "#e9eef3", borderRadius: 8}}>
      <div style={{height: 10, width: , background: "#3b82f6", borderRadius: 8, transition: "width .25s"}} />
    </div>
  );
}
