import { Navigate, Outlet, useLocation } from "react-router-dom";

function isAuthenticated(): boolean {
  const token = localStorage.getItem("autoescola_token");
  return !!token;
}

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
