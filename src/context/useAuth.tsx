import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/mockData";
import axios from "axios";

export type LoginParams = {
  username: string;
  password: string;
};
type UserContextType = {
  login: (data: LoginParams) => void;
  logout: () => void;
  isLogin: () => boolean;
  token: string | null;
};

type Props = { children: React.ReactNode };
const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setIsReady(true);
  }, []);

  const login = async (data: LoginParams) => {
    try {
      // Send login request to the API
      const response = await axios.post("/api/staff/login", data);
      if (response.status === 200) {
        const userData = response.data; // Entire response data
        localStorage.setItem("user", JSON.stringify(userData)); // Save data as a JSON string
        setToken("token"); // Update token in state (if applicable)
        navigate("/dashboard"); // Redirect to the dashboard
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const isLogin = () => {
    return Boolean(token);
  };

  return (
    <UserContext.Provider value={{ isLogin, login, logout, token }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);