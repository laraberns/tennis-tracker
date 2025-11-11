import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistroTreino from "./pages/RegistroTreino/RegistroTreino";
import Alert from "./components/Alert";
import HistoricoTreinos from "./pages/HistoricoTreinos/HistoricoTreinos";
import DicasConteudos from "./pages/DicasConteudos/DicasConteudos";
import Perfil from "./pages/Perfil/Perfil";

const App = () => {
  return (
    <Router>
      <Alert />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registro-treino" element={<RegistroTreino />} />
        <Route path="/historico-treinos" element={<HistoricoTreinos />} />
        <Route path="/dicas-conteudos" element={<DicasConteudos />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
};

export default App;