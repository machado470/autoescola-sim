import { Navigate } from "react-router-dom";
import { getToken } from "../lib/auth";

export default function PrivateRoute({ element }: { element: any }) {
  const token = getToken();
  return token ? element : <Navigate to="/login" replace />;
}
