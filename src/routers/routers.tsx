import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../views/Login";
import { ChangePassword } from "../views/ChangePassword";
import { ProtectedRouters } from "./ProtectedRouters";
import { Dashboard } from "../views/Dashboard";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <div>Home</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <div>Signup</div>,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRouters>
            <Dashboard />
          </ProtectedRouters>
        ),
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
    ],
  },
]);
