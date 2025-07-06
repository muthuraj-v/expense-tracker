import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./ExpenseData";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (isError) {
    console.error(error);
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
