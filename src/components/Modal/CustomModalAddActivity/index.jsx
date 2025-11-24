import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import Input from "../../Input"; 
import Button from "../../Button"; 
import { showError } from "../../Alert";

const CustomModalAddActivity = ({ isOpen, onClose, treino, onSave, isEdit = false }) => {
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    aces: "",
    errors: "",
    doubleFaults: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (treino) {
      setFormData({
        date: treino.date || "",
        duration: treino.duration?.toString() || "",
        aces: treino.aces?.toString() || "",
        errors: treino.errors?.toString() || "",
        doubleFaults: treino.doubleFaults?.toString() || "",
        notes: treino.notes || "",
      });
    } else {
      setFormData({
        date: "",
        duration: "",
        aces: "",
        errors: "",
        doubleFaults: "",
        notes: "",
      });
    }
  }, [treino, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = async () => {
    const { date, duration, aces, errors } = formData;
    
    if (!date || !duration || !aces || !errors) {
      showError("Preencha todos os campos obrigatórios!");
      return;
    }

    if (parseInt(duration) <= 0 || parseInt(aces) < 0 || parseInt(errors) < 0) {
      showError("Valores numéricos devem ser positivos!");
      return;
    }

    setLoading(true);

    try {
      const trainingData = {
        date: date,
        duration: parseInt(duration),
        aces: parseInt(aces),
        errors: parseInt(errors),
        doubleFaults: formData.doubleFaults ? parseInt(formData.doubleFaults) : 0,
        notes: formData.notes || ""
      };

      await onSave({ 
        ...(treino && { id: treino.id }), 
        ...trainingData 
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      date: "",
      duration: "",
      aces: "",
      errors: "",
      doubleFaults: "",
      notes: "",
    });
    onClose();
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {isEdit ? "Editar Treino" : "Adicionar Novo Treino"}
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Input
            label="Data do Treino"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            disabled={loading}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Input
            label="Duração (min)"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            disabled={loading}
            inputProps={{ min: 1 }}
            helperText="Duração mínima: 1 minuto"
          />

          <Input
            label="Número de Aces"
            type="number"
            name="aces"
            value={formData.aces}
            onChange={handleChange}
            required
            disabled={loading}
            inputProps={{ min: 0 }}
          />

          <Input
            label="Erros Não Forçados"
            type="number"
            name="errors"
            value={formData.errors}
            onChange={handleChange}
            required
            disabled={loading}
            inputProps={{ min: 0 }}
          />

          <Input
            label="Duplas Faltas"
            type="number"
            name="doubleFaults"
            value={formData.doubleFaults}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ min: 0 }}
            helperText="Opcional"
          />

          <Input
            label="Observações"
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            disabled={loading}
            multiline
            rows={3}
            helperText="Observações sobre o treino (opcional)"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button 
          color="secondary" 
          onClick={handleClose}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          color="primary" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Salvando..." : (isEdit ? "Atualizar" : "Adicionar")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModalAddActivity;