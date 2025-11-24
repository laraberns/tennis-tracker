import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { useTraining } from "../../context/TrainingContext"; 
import Layout from "../../components/Layout";
import { showError } from "../../components/Alert"; 
import Button from "../../components/Button";
import Menu from "../../components/Menu";
import Input from "../../components/Input";
import { container, title, formWrapper } from "./styles";

const RegistroTreino = () => {
  const navigate = useNavigate();
  const { saveTraining, loading } = useTraining();
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

  const handleSubmit = async () => {
    const { date, duration, aces, errors } = formData;
    
    if (!date || !duration || !aces || !errors) {
      showError("Preencha todos os campos obrigatórios!");
      return;
    }

    if (duration <= 0 || aces < 0 || errors < 0) {
      showError("Valores numéricos devem ser positivos!");
      return;
    }

    try {
      const trainingData = {
        date: date,
        duration: parseInt(duration),
        aces: parseInt(aces),
        errors: parseInt(errors),
        doubleFaults: formData.doubleFaults ? parseInt(formData.doubleFaults) : 0,
        notes: formData.notes || ""
      };

      await saveTraining(trainingData);

      setFormData({
        date: "",
        duration: "",
        aces: "",
        errors: "",
        doubleFaults: "",
        notes: "",
      });

      setTimeout(() => {
        navigate("/historico-treinos");
      }, 1500);

    } catch (error) {
    }
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
                label="Data do Treino"
                type="date"
                value={formData.date}
                onChange={handleChange}
                name="date"
                required
                disabled={loading}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Input
                label="Duração (min)"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                name="duration"
                required
                disabled={loading}
                inputProps={{ min: 1 }}
                helperText="Duração mínima: 1 minuto"
              />

              <Input
                label="Número de Aces"
                type="number"
                value={formData.aces}
                onChange={handleChange}
                name="aces"
                required
                disabled={loading}
                inputProps={{ min: 0 }}
              />

              <Input
                label="Erros Não Forçados"
                type="number"
                value={formData.errors}
                onChange={handleChange}
                name="errors"
                required
                disabled={loading}
                inputProps={{ min: 0 }}
              />

              <Input
                label="Duplas Faltas"
                type="number"
                value={formData.doubleFaults}
                onChange={handleChange}
                name="doubleFaults"
                disabled={loading}
                inputProps={{ min: 0 }}
                helperText="Opcional"
              />

              <Input
                label="Observações"
                type="text"
                value={formData.notes}
                onChange={handleChange}
                name="notes"
                disabled={loading}
                multiline
                rows={3}
                helperText="Observações sobre o treino (opcional)"
              />

              <Button 
                onClick={handleSubmit} 
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar Treino"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default RegistroTreino;