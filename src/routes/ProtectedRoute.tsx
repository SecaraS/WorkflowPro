import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { auth } from "../services/auth";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
