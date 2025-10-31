import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const token = typeof window !== "undefined" ? localStorage.getItem("aes_token") : null;

  if (!token) {
    // não autenticado
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return <>{children}</>;
}
