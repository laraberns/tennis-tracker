import { useState } from "react";
import { Box, Typography, Grid, IconButton, Stack } from "@mui/material";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Menu from "../../components/Menu";
import { showSuccess } from "../../components/Alert";
import { format } from "date-fns";
import { Edit, Delete } from "@mui/icons-material";
import CustomModalAddActivity from "../../components/Modal/CustomModalAddActivity";
import CustomModalDelete from "../../components/Modal/CustomModalDelete";
import Input from "../../components/Input";
import {
  containerStyle,
  filterStyle,
  cardStackStyle,
  actionStackStyle,
  title,
} from "./styles";

const HistoricoTreinos = () => {
  const [trainingData, setTrainingData] = useState([
    { id: 1, date: "2025-10-01", duration: 60, aces: 5, errors: 3, notes: "Treino leve" },
    { id: 2, date: "2025-10-03", duration: 45, aces: 7, errors: 2, notes: "Foco em saque" },
    { id: 3, date: "2025-10-05", duration: 50, aces: 4, errors: 5, notes: "Treino intenso" },
  ]);

  const [searchDate, setSearchDate] = useState("");
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredData = searchDate
    ? trainingData.filter((t) => t.date === searchDate)
    : trainingData;

  const handleEdit = (treino) => {
    setEditing(treino);
    setIsModalOpen(true);
  };

  const handleSave = (updatedTreino) => {
    setTrainingData(
      trainingData.map((t) => (t.id === updatedTreino.id ? updatedTreino : t))
    );
    showSuccess("Treino atualizado com sucesso!");
    setIsModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setTrainingData(trainingData.filter((t) => t.id !== deleteId));
    showSuccess("Treino excluído com sucesso!");
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Menu />
        <Box sx={containerStyle}>
          <Typography variant="h5" sx={title}>
            Histórico de Treinos
          </Typography>

          <Box sx={filterStyle}>
            <Input
              label="Filtrar por data"
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </Box>

          <Grid container spacing={2}>
            {filteredData.map(({ id, date, duration, aces, errors, notes }) => (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Card>
                  <Stack spacing={1} sx={cardStackStyle}>
                    {[
                      ["Data", format(new Date(date), "dd/MM/yyyy")],
                      ["Duração", `${duration} min`],
                      ["Aces", aces],
                      ["Erros", errors],
                      ["Observações", notes],
                    ].map(([label, value]) => (
                      <Typography key={label}>
                        <strong>{label}:</strong> {value}
                      </Typography>
                    ))}

                    <Stack direction="row" spacing={1} sx={actionStackStyle}>
                      <IconButton color="primary" onClick={() => handleEdit({ id, date, duration, aces, errors, notes })}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(id)}>
                        <Delete />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>

          {isModalOpen && editing && (
            <CustomModalAddActivity
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              treino={editing}
              onSave={handleSave}
            />
          )}

          {isDeleteModalOpen && (
            <CustomModalDelete
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={confirmDelete}
              message="Deseja realmente excluir este treino?"
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default HistoricoTreinos;

