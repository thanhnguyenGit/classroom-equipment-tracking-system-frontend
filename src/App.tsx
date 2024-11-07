import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
