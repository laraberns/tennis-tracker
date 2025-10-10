import { useState } from "react";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Alert from "../../../components/Alert";
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

  const [alertMessage, setAlertMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setAlertMessage({ type: "error", text: "Preencha todos os campos." });
      return;
    }

    setAlertMessage({ type: "success", text: "Login realizado com sucesso!" });
    console.log("Login:", formData);
  };

  return (
    <Layout>
      <div style={authContainer}>
        {alertMessage && (
          <Alert type={alertMessage.type}>{alertMessage.text}</Alert>
        )}

        <div style={authCard}>
          <div style={logoWrapper}>
            <img src={logoImg} alt="Tennis Tracker" style={logoStyle} />
          </div>

          <h2 style={title}>Entrar</h2>

          <form onSubmit={handleSubmit} style={formStyle}>
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
          </form>

          <p style={linkText}>
            Ainda não tem conta? <a href="/cadastro">Cadastrar</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
