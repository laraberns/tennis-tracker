import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Input from "../../Input"; 
import Button from "../../Button"; 
import Modal from "..";

const CustomModalAddActivity = ({ isOpen, onClose, treino, onSave }) => {
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    aces: "",
    errors: "",
    doubleFaults: "",
    notes: "",
  });

  useEffect(() => {
    if (treino) {
      setFormData({
        date: treino.date || "",
        duration: treino.duration || "",
        aces: treino.aces || "",
        errors: treino.errors || "",
        doubleFaults: treino.doubleFaults || "",
        notes: treino.notes || "",
      });
    }
  }, [treino]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { date, duration, aces, errors } = formData;
    if (!date || !duration || !aces || !errors) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    onSave({ ...treino, ...formData });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={treino ? "Editar Treino" : "Adicionar Treino"}
    >
      <Stack spacing={2}>
        <Input
          label="Data"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={!formData.date ? "Campo obrigatório" : ""}
        />
        <Input
          label="Duração (min)"
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          error={!formData.duration ? "Campo obrigatório" : ""}
        />
        <Input
          label="Aces"
          type="number"
          name="aces"
          value={formData.aces}
          onChange={handleChange}
          error={!formData.aces ? "Campo obrigatório" : ""}
        />
        <Input
          label="Erros"
          type="number"
          name="errors"
          value={formData.errors}
          onChange={handleChange}
          error={!formData.errors ? "Campo obrigatório" : ""}
        />
        <Input
          label="Duplas Faltas"
          type="number"
          name="doubleFaults"
          value={formData.doubleFaults}
          onChange={handleChange}
        />
        <Input
          label="Observações"
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {treino ? "Salvar" : "Adicionar"}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CustomModalAddActivity;
