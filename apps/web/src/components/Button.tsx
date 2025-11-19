import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  loading?: boolean;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  loading = false,
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "w-full py-3 font-semibold rounded-lg transition text-center";

  const styles = {
    primary:
      "bg-primary hover:bg-primaryHover text-black shadow-[0_0_15px_#22c55e44]",
    outline:
      "border border-border text-text hover:bg-surface",
    ghost:
      "text-text hover:bg-surface",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {loading ? "..." : children}
    </button>
  );
}
