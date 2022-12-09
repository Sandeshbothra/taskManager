import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./App";
import { Login } from "./pages/Login";
import { LoginForm } from "./components/Forms/LoginForm/LoginForm";
import { ProtectedRoute } from "./components/AuthComponents/ProtectedRoute";
import { AuthLayout } from "./components/AuthComponents/AuthLayout";
import { Reports } from "./pages/Report";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <AuthLayout />, //Added Authlayout for performing user authentication before redirecting to any route
    children: [
      {
        element: (
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ),
          },
          {
            path: "/reports",
            element: (
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: (
          <Login>
            <LoginForm></LoginForm>
          </Login>
        ),
      }
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
