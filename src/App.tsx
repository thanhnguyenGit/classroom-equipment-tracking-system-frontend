import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/useAuth";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </>
  );
}

export default App;
