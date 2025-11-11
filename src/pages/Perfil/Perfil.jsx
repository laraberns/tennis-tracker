import { useState } from "react";
import { Box, Typography, Stack, Avatar, Divider, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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
  const { user, logout, changePassword } = useAuth();
  const navigate = useNavigate();
  
  const [perfil, setPerfil] = useState({
    nome: user?.displayName || user?.email?.split('@')[0] || "Usuário",
    email: user?.email || "",
    senha: "",
  });

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);

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

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError("As novas senhas não coincidem!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showError("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setChangingPassword(true);

    try {
      await changePassword(passwordData.newPassword);
      setChangePasswordOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
    } finally {
      setChangingPassword(false);
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
                  {perfil.nome.charAt(0).toUpperCase()}
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
                disabled
              />

              <Button 
                color="primary" 
                onClick={() => setChangePasswordOpen(true)}
                fullWidth
              >
                🔒 Alterar Senha
              </Button>

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

          <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <Input
                  label="Nova Senha"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  disabled={changingPassword}
                  helperText="Mínimo 6 caracteres"
                />
                <Input
                  label="Confirmar Nova Senha"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  disabled={changingPassword}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setChangePasswordOpen(false)} disabled={changingPassword}>
                Cancelar
              </Button>
              <Button 
                onClick={handleChangePassword} 
                disabled={changingPassword}
                color="primary"
              >
                {changingPassword ? "Alterando..." : "Alterar Senha"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Layout>
  );
};

export default Perfil;