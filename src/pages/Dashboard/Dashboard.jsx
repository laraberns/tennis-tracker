import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Menu from "../../components/Menu";
import { useTraining } from "../../context/TrainingContext";
import { useAuth } from "../../context/AuthContext";
import {
  dashboardContainer,
  welcomeText,
  cardsContainer,
  chartContainer,
  loadingContainer,
} from "./styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { trainings, loading } = useTraining();
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    totalTrainings: 0,
    averageDuration: 0,
    totalAces: 0,
    totalErrors: 0
  });

  useEffect(() => {
    if (trainings.length > 0) {
      const sortedTrainings = [...trainings]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-7); 

      const chartDataFormatted = sortedTrainings.map(training => ({
        date: new Date(training.date).toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit' 
        }),
        aces: training.aces,
        errors: training.errors,
        duration: training.duration
      }));

      setChartData(chartDataFormatted);

      const totalTrainings = trainings.length;
      const totalDuration = trainings.reduce((acc, t) => acc + t.duration, 0);
      const totalAces = trainings.reduce((acc, t) => acc + t.aces, 0);
      const totalErrors = trainings.reduce((acc, t) => acc + t.errors, 0);

      setStats({
        totalTrainings,
        averageDuration: Math.round(totalDuration / totalTrainings),
        totalAces,
        totalErrors
      });
    } else {
      setChartData([]);
      setStats({
        totalTrainings: 0,
        averageDuration: 0,
        totalAces: 0,
        totalErrors: 0
      });
    }
  }, [trainings]);

  const getPlayerName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return "Jogador";
  };

  if (loading && trainings.length === 0) {
    return (
      <Layout>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Menu />
          <Box sx={{ flex: 1, p: 2 }}>
            <Box sx={dashboardContainer}>
              <Typography variant="h5" sx={welcomeText}>
                Olá, {getPlayerName()} 👋
              </Typography>
              <Box sx={loadingContainer}>
                <Typography>Carregando dados do dashboard...</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Menu />
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={dashboardContainer}>
            <Typography variant="h5" sx={welcomeText}>
              Olá, {getPlayerName()} 👋
            </Typography>

            <Grid container spacing={2} sx={cardsContainer}>
              <Grid item xs={12} sm={6} md={3}>
                <Card title="Total de Treinos">
                  {stats.totalTrainings}
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card title="Duração Média">
                  {stats.totalTrainings > 0 ? `${stats.averageDuration} min` : "0 min"}
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card title="Aces Totais">
                  {stats.totalAces}
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card title="Erros Totais">
                  {stats.totalErrors}
                </Card>
              </Grid>
            </Grid>

            {chartData.length > 0 ? (
              <Box sx={chartContainer} mt={4}>
                <Typography variant="h6" gutterBottom>
                  Evolução dos Últimos Treinos
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="aces" 
                      stroke="#5DD9C1" 
                      name="Aces"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="errors" 
                      stroke="#B084CC" 
                      name="Erros"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Box sx={chartContainer} mt={4}>
                <Typography variant="h6" gutterBottom>
                  Evolução dos Treinos
                </Typography>
                <Box sx={loadingContainer}>
                  <Typography variant="body1" color="text.secondary">
                    {trainings.length === 0 
                      ? "Registre seu primeiro treino para ver as estatísticas" 
                      : "Processando dados do gráfico..."
                    }
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;