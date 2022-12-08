import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./../../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    // user is not authenticated redirect to login
    return <Navigate to="/login" />;
  } else if (location.pathname == "/login") {
    // user is already authenticated redirect to home page
    <Navigate to="/" />;
  }
  return children;
};
