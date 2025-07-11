import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuth = localStorage.getItem("auth") === "true";

  return isAuth ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
