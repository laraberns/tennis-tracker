import { useState } from "react";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Alert from "../../../components/Alert";
import logoImg from "../../../assets/logo.png";
import {
  authContainer,
  authCard,
  logoStyle,
  formStyle,
  linkText,
  title,
  logoWrapper,
} from "../authStyles";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setAlertMessage({ type: "error", text: "As senhas não coincidem!" });
      return;
    }

    setAlertMessage({ type: "success", text: "Conta criada com sucesso!" });
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
      <div style={authContainer}>
        {alertMessage && (
          <Alert type={alertMessage.type}>{alertMessage.text}</Alert>
        )}

        <div style={authCard}>
          <div style={logoWrapper}>
            <img src={logoImg} alt="Tennis Tracker" style={logoStyle} />
          </div>

          <h2 style={title}>Criar Conta</h2>

          <form onSubmit={handleSubmit} style={formStyle}>
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
          </form>

          <p style={linkText}>
            Já tem conta? <a href="/login">Entrar</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
