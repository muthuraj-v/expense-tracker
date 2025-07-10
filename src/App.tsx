import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Reports from "./pages/Reports";
import AddTransaction from "./pages/AddTransaction";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = Cookies.get("jwt");
  return token ? <>{children}</> : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add_transaction"
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
