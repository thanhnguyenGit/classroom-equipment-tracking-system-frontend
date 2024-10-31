import React from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { logout } = useAuth();

  const logoutButton = () => {
    logout();
  };
  return (
    <div>
      Dashboard
      <button onClick={logoutButton}>Logout</button>
    </div>
  );
};
