import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Link,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showError("As senhas não coincidem!");
      return;
    }

    if (formData.password.length < 6) {
      showError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.name);
      navigate("/dashboard");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={authContainer}>
        <Paper elevation={3} sx={authCard}>
          <Box sx={logoWrapper}>
            <Box
              component="img"
              src={logoImg}
              alt="Tennis Tracker"
              sx={logoStyle}
            />
          </Box>

          <Typography variant="h5" sx={title}>
            Criar Conta
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
            <Stack spacing={2}>
              <Input
                label="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />

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
                helperText="Mínimo 6 caracteres"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Ocultar senha" : "Mostrar senha"
                        }
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

              <Input
                label="Confirmar senha"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? "Ocultar senha"
                            : "Mostrar senha"
                        }
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </Stack>
          </Box>

          <Typography sx={linkText}>
            Já tem conta?{" "}
            <Link href="/login" underline="hover">
              Entrar
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
};

export default SignUp;
