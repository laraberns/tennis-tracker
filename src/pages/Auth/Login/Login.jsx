import { useState } from "react";
import { Box, Typography, Link, Stack, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { showError } from "../../../components/Alert"; 
import logoImg from "../../../assets/logo.png";

import {
  authContainer,
  authCard,
  logoWrapper,
  logoStyle,
  formStyle,
  linkText,
  title,
} from "../authStyles";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      showError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={authContainer}>
        <Box sx={authCard}>
          <Box sx={logoWrapper}>
            <Box
              component="img"
              src={logoImg}
              alt="Tennis Tracker"
              sx={logoStyle}
            />
          </Box>

          <Typography variant="h5" sx={title}>
            Entrar
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
            <Stack spacing={2}>
              <Input
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <Input
                label="Senha"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </Stack>
          </Box>

          <Typography sx={linkText}>
            Ainda não tem conta?{" "}
            <Link href="/cadastro" underline="hover">
              Cadastrar
            </Link>
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;