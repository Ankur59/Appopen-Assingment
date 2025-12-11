import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./pages/login";
import Dahsboard from "./pages/Dahsboard";

function App() {

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dahsboard />} />
      </Routes>
  );
}

export default App;
