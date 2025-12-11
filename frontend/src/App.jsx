import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dahsboard from "./pages/Dahsboard";
import Tod from "./pages/Tod";
import ProtectedRoute from "./hooks/checkAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
      <Route path="/todos" element={<Tod />} />
      <Route path="/dashboard" element={<Dahsboard />} />
      </Route>
    </Routes>
  );
}

export default App;
