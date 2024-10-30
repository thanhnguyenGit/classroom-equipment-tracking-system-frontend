import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserContextType = {
  login: () => void;
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

  const login = () => {
    const newToken = "token";
    localStorage.setItem("token", newToken);
    setToken(newToken);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
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
