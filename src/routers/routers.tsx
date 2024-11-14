import { Route, Routes } from "react-router-dom";
import Devices from "../pages/Devices.tsx";
import Dashboard from "../pages/Dashboard.tsx";
const AppRouters = () => {
  return (
    <Routes>
      <Route path="/tickets" element={<Dashboard />} />
      <Route path="/devices" element={<Devices />} />
    </Routes>
  )
};

export default AppRouters;
