import { useState } from "react";
import { Box, Paper, Typography, Link, Stack } from "@mui/material";
import Layout from "../../../components/Layout"; // <-- mantém o Layout
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { showSuccess, showError } from "../../../components/Alert"; // <-- toaster
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showError("As senhas não coincidem!");
      return;
    }

    showSuccess("Conta criada com sucesso!");
    console.log("Cadastro realizado:", formData);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
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
              />

              <Input
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Input
                label="Confirmar senha"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button type="submit">Cadastrar</Button>
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
