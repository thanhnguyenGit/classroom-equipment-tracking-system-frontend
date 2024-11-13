import { BrowserRouter, Router } from "react-router-dom";
import "./App.scss";
import AppRouters from "./routers/routers";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
    </div>
  );
}

export default App;
