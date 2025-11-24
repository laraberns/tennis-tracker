import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TrainingProvider } from "./context/TrainingContext";

import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistroTreino from "./pages/RegistroTreino/RegistroTreino";
import Alert from "./components/Alert";
import HistoricoTreinos from "./pages/HistoricoTreinos/HistoricoTreinos";
import DicasConteudos from "./pages/DicasConteudos/DicasConteudos";
import Perfil from "./pages/Perfil/Perfil";
import PublicRoute from "./components/Routes/PublicRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";

const App = () => {
  return (
    <AuthProvider>
      <TrainingProvider>
        <Router>
          <Alert />
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/cadastro"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/registro-treino"
              element={
                <ProtectedRoute>
                  <RegistroTreino />
                </ProtectedRoute>
              }
            />

            <Route
              path="/historico-treinos"
              element={
                <ProtectedRoute>
                  <HistoricoTreinos />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dicas-conteudos"
              element={
                <ProtectedRoute>
                  <DicasConteudos />
                </ProtectedRoute>
              }
            />

            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />

            <Route
              path="/esqueci-senha"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </TrainingProvider>
    </AuthProvider>
  );
};

export default App;
