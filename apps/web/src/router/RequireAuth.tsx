import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../store/auth";

export default function RequireAuth({ children, allowed }) {
  const { token, role } = useAuth();

  // Não tem token → volta para login
  if (!token) return <Navigate to="/login" />;

  // Tem token mas não tem permissão → volta para home
  if (!allowed.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}
