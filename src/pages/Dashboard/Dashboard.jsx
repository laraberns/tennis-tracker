import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Menu from "../../components/Menu";
import {
  dashboardContainer,
  welcomeText,
  cardsContainer,
  chartContainer,
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

const Dashboard = ({ playerName = "Maria Luísa" }) => {
  const [trainingData, setTrainingData] = useState([
    { date: "2025-10-01", aces: 5, errors: 3, duration: 60 },
    { date: "2025-10-03", aces: 7, errors: 2, duration: 45 },
    { date: "2025-10-05", aces: 4, errors: 5, duration: 50 },
  ]);


  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Menu />
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={dashboardContainer}>
            <Typography variant="h5" sx={welcomeText}>
              Olá, {playerName} 👋
            </Typography>

            <Grid container spacing={2} sx={cardsContainer}>
              <Grid item xs={12} sm={6} md={3}>
                <Card title="Total de Treinos">{trainingData.length}</Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card title="Duração Média">
                  {Math.round(
                    trainingData.reduce((acc, t) => acc + t.duration, 0) /
                      trainingData.length
                  )}{" "}
                  min
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card title="Aces Totais">
                  {trainingData.reduce((acc, t) => acc + t.aces, 0)}
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card title="Erros Totais">
                  {trainingData.reduce((acc, t) => acc + t.errors, 0)}
                </Card>
              </Grid>
            </Grid>

            <Box sx={chartContainer} mt={4}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trainingData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="aces" stroke="#5DD9C1" />
                  <Line type="monotone" dataKey="errors" stroke="#B084CC" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
