import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import Layout from "../../components/Layout";
import { showSuccess, showError } from "../../components/Alert";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { date, duration, aces, errors } = formData;
    if (!date || !duration || !aces || !errors) {
      showError("Preencha todos os campos obrigatórios!");
      return;
    }

    showSuccess("Treino registrado com sucesso!");

    setTimeout(() => {
      navigate("/historico");
    }, 1500);
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Menu />
        <Box sx={container}>
          <Typography variant="h5" sx={title}>
            Registrar Novo Treino
          </Typography>

          <Box sx={formWrapper} component="form">
            <Stack spacing={2}>
              <Input
                label="Data do Treino*"
                type="date"
                value={formData.date}
                onChange={handleChange}
                name="date"
              />

              <Input
                label="Duração (min)*"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                name="duration"
              />

              <Input
                label="Número de Aces*"
                type="number"
                value={formData.aces}
                onChange={handleChange}
                name="aces"
              />

              <Input
                label="Erros Não Forçados*"
                type="number"
                value={formData.errors}
                onChange={handleChange}
                name="errors"
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
            </Stack>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default RegistroTreino;
