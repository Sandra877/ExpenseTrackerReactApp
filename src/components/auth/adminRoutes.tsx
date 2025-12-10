import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { ReactNode } from "react";


type JwtPayload = {
  role: string;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.role !== "admin") {
      return <Navigate to="/landingpage" />;
    }
  } catch {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
