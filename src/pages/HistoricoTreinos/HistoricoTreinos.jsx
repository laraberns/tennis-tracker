import { useState, useEffect } from "react";
import { Box, Typography, Grid, IconButton, Stack } from "@mui/material";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Menu from "../../components/Menu";
import { useTraining } from "../../context/TrainingContext";
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
  emptyState,
} from "./styles";

const HistoricoTreinos = () => {
  const { trainings, loading, updateTraining, deleteTraining, refreshTrainings } = useTraining();
  const [searchDate, setSearchDate] = useState("");
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredData = searchDate
    ? trainings.filter((t) => t.date === searchDate)
    : trainings;

  useEffect(() => {
    refreshTrainings();
  }, []);

  const handleEdit = (treino) => {
    setEditing(treino);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedTreino) => {
    try {
      await updateTraining(updatedTreino.id, {
        date: updatedTreino.date,
        duration: updatedTreino.duration,
        aces: updatedTreino.aces,
        errors: updatedTreino.errors,
        doubleFaults: updatedTreino.doubleFaults || 0,
        notes: updatedTreino.notes || ""
      });
      setIsModalOpen(false);
      setEditing(null);
    } catch (error) {
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTraining(deleteId);
      setDeleteId(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
    }
  };

  if (loading && trainings.length === 0) {
    return (
      <Layout>
        <Box sx={{ display: "flex" }}>
          <Menu />
          <Box sx={containerStyle}>
            <Typography variant="h5" sx={title}>
              Histórico de Treinos
            </Typography>
            <Typography>Carregando treinos...</Typography>
          </Box>
        </Box>
      </Layout>
    );
  }

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
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          {filteredData.length === 0 ? (
            <Box sx={emptyState}>
              <Typography variant="h6" color="text.secondary">
                {searchDate ? "Nenhum treino encontrado para esta data" : "Nenhum treino registrado ainda"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {searchDate ? "Tente outra data ou " : "Vá para "}
                <a href="/registro-treino" style={{ color: 'primary.main' }}>
                  Registrar Treino
                </a>
                {!searchDate && " para começar"}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredData.map(({ id, date, duration, aces, errors, doubleFaults, notes }) => (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Card>
                    <Stack spacing={1} sx={cardStackStyle}>
                      {[
                        ["Data", format(new Date(date), "dd/MM/yyyy")],
                        ["Duração", `${duration} min`],
                        ["Aces", aces],
                        ["Erros", errors],
                        ["Duplas Faltas", doubleFaults || 0],
                        ["Observações", notes || "Sem observações"],
                      ].map(([label, value]) => (
                        <Typography key={label}>
                          <strong>{label}:</strong> {value}
                        </Typography>
                      ))}

                      <Stack direction="row" spacing={1} sx={actionStackStyle}>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEdit({ 
                            id, 
                            date, 
                            duration, 
                            aces, 
                            errors, 
                            doubleFaults: doubleFaults || 0, 
                            notes: notes || "" 
                          })}
                        >
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
          )}

          {isModalOpen && editing && (
            <CustomModalAddActivity
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              treino={editing}
              onSave={handleSave}
              isEdit={true}
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