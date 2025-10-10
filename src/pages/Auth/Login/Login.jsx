import { useState } from "react";
import { Box, Typography, Link, Stack } from "@mui/material";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { showSuccess, showError } from "../../../components/Alert"; 
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showError("Preencha todos os campos.");
      return;
    }

    showSuccess("Login realizado com sucesso!");
    console.log("Login:", formData);
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
              />

              <Input
                label="Senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Button type="submit">Entrar</Button>
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
