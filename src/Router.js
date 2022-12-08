import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./App";
import { Login } from "./pages/Login";
import { LoginForm } from "./components/Forms/LoginForm/LoginForm";
import { SignupForm } from "./components/Forms/SignupForm/SignupForm";
import { ProtectedRoute } from "./components/AuthComponents/ProtectedRoute";
import { AuthLayout } from "./components/AuthComponents/AuthLayout";

const router = createBrowserRouter([
  {
    element: <AuthLayout />, //Added Authlayout for performing user authentication before redirecting to any route
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <Login>
            <LoginForm></LoginForm>
          </Login>
        ),
      },
      {
        path: "/signup",
        element: (
          <Login>
            <SignupForm></SignupForm>
          </Login>
        ),
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
