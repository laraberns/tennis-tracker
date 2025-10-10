import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistroTreino from "./pages/RegistroTreino/RegistroTreino";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registro-treino" element={<RegistroTreino />} />
      </Routes>
    </Router>
  );
};

export default App;
