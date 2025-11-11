import { useState } from "react";
import { Box, Typography, Stack, Avatar, Divider, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import Menu from "../../components/Menu";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  containerStyle,
  title,
  formStyle,
  buttonGroup,
  avatarBox,
} from "./styles";
import { showSuccess, showError } from "../../components/Alert";

const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [perfil, setPerfil] = useState({
    nome: user?.displayName || "Lara Berns",
    email: user?.email || "lara@exemplo.com",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    showSuccess("Perfil atualizado com sucesso!");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      showError("Erro ao fazer logout. Tente novamente.");
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <Menu />

        <Box sx={containerStyle}>
          <Typography variant="h4" sx={title}>
            Meu Perfil
          </Typography>

          <Paper elevation={3} sx={formStyle}>
            <Stack spacing={3} alignItems="center">
              <Box sx={avatarBox}>
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    fontSize: "2rem",
                    bgcolor: "primary.main",
                    boxShadow: 3,
                  }}
                >
                  {perfil.nome.charAt(0)}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, marginTop: "0.5rem" }}
                >
                  {perfil.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {perfil.email}
                </Typography>
              </Box>

              <Divider sx={{ width: "100%", margin: "1rem 0" }} />

              <Input
                label="Nome"
                name="nome"
                value={perfil.nome}
                onChange={handleChange}
              />

              <Input
                label="E-mail"
                name="email"
                type="email"
                value={perfil.email}
                onChange={handleChange}
              />

              <Input
                label="Nova Senha"
                name="senha"
                type="password"
                value={perfil.senha}
                onChange={handleChange}
                placeholder="Digite nova senha para alterar"
              />

              <Stack direction="row" spacing={2} sx={buttonGroup}>
                <Button color="primary" onClick={handleSave} fullWidth>
                  💾 Salvar
                </Button>
                <Button color="danger" onClick={handleLogout} fullWidth>
                  🚪 Sair
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};

export default Perfil;