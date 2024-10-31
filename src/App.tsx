import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/useAuth";
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
