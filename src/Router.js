import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./App";
import { Login } from "./pages/Login";
import { LoginForm } from "./components/Forms/LoginForm/LoginForm";
import { SignupForm } from "./components/Forms/SignupForm/SignupForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

export const Router = () => <RouterProvider router={router} />;
