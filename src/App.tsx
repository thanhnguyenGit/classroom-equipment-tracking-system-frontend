import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Device from "./pages/Devices"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
