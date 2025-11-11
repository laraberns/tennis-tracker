import { useState } from "react";
import { Box, Typography, Link, Stack, Paper } from "@mui/material";
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showError("Digite seu e-mail.");
      return;
    }

    setLoading(true);
    
    try {
      await resetPassword(email);
      setEmailSent(true);
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
            Recuperar Senha
          </Typography>

          {!emailSent ? (
            <>
              <Typography variant="body2" sx={{ textAlign: 'center', mb: 2, color: 'text.secondary' }}>
                Digite seu e-mail para receber um link de recuperação de senha.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
                <Stack spacing={2}>
                  <Input
                    label="E-mail"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />

                  <Button type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar Link"}
                  </Button>
                </Stack>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ textAlign: 'center', mb: 2, color: 'success.main' }}>
                ✅ E-mail enviado com sucesso!
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', mb: 3, color: 'text.secondary' }}>
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </Typography>
              
              <Button onClick={() => navigate('/login')} fullWidth>
                Voltar para o Login
              </Button>
            </>
          )}

          <Typography sx={linkText}>
            Lembrou sua senha?{" "}
            <Link href="/login" underline="hover">
              Fazer login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
};

export default ForgotPassword;