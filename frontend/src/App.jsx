import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./pages/login";
import Dahsboard from "./pages/Dahsboard";
import ProtectedRoute from "./hooks/checkAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dahsboard />} />
      </Route>
    </Routes>
  );
}

export default App;
