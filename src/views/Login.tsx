import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

export const Login = () => {
  const { login } = useAuth();
  const naviagte = useNavigate();
  return (
    <div>
      <div>
        <p>User name</p>
        <input type="text" />
        <p>Password</p>
        <input type="text" />
      </div>
      <button onClick={login}>Login</button>
    </div>
  );
};
