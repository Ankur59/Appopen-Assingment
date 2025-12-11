import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Todos from "./pages/Todos";
import ProtectedRoute from "./hooks/checkAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todos" element={<Todos />} />
      </Route>
    </Routes>
  );
}

export default App;
