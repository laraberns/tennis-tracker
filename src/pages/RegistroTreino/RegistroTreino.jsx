import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Menu from "../../components/Menu";
import Input from "../../components/Input";
import { container, title, formWrapper } from "./styles";

const RegistroTreino = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    aces: "",
    errors: "",
    doubleFaults: "",
    notes: "",
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { date, duration, aces, errors } = formData;
    if (!date || !duration || !aces || !errors) {
      setAlert({
        type: "error",
        text: "Preencha todos os campos obrigatórios!",
      });
      return;
    }

    setAlert({ type: "success", text: "Treino registrado com sucesso!" });

    setTimeout(() => {
      navigate("/historico");
    }, 1500);
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Menu />
        <div style={container}>
          {alert && <Alert type={alert.type}>{alert.text}</Alert>}

          <h2 style={title}>Registrar Novo Treino</h2>

          <div style={formWrapper}>
            <Input
              label="Data do Treino*"
              type="date"
              value={formData.date}
              onChange={handleChange}
              name="date"
              error={
                !formData.date && alert?.type === "error"
                  ? "Campo obrigatório"
                  : ""
              }
            />

            <Input
              label="Duração (min)*"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              name="duration"
              error={
                !formData.duration && alert?.type === "error"
                  ? "Campo obrigatório"
                  : ""
              }
            />

            <Input
              label="Número de Aces*"
              type="number"
              value={formData.aces}
              onChange={handleChange}
              name="aces"
              error={
                !formData.aces && alert?.type === "error"
                  ? "Campo obrigatório"
                  : ""
              }
            />

            <Input
              label="Erros Não Forçados*"
              type="number"
              value={formData.errors}
              onChange={handleChange}
              name="errors"
              error={
                !formData.errors && alert?.type === "error"
                  ? "Campo obrigatório"
                  : ""
              }
            />

            <Input
              label="Duplas Faltas"
              type="number"
              value={formData.doubleFaults}
              onChange={handleChange}
              name="doubleFaults"
            />

            <Input
              label="Observações"
              type="text"
              value={formData.notes}
              onChange={handleChange}
              name="notes"
            />

            <Button onClick={handleSubmit}>Salvar Treino</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistroTreino;
