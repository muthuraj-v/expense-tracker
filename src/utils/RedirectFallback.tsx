import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "./ExpenseData"; // ✅ check path

const RedirectFallback: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isLoading) return <div className="text-center py-6">Loading...</div>;

  if (isError || !data) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/main" replace />;
};

export default RedirectFallback;
