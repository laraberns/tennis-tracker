import { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Alert from "../../components/Alert";
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
import Menu from "../../components/Menu";

const Dashboard = ({ playerName = "Maria Luísa" }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [trainingData, setTrainingData] = useState([
    { date: "2025-10-01", aces: 5, errors: 3, duration: 60 },
    { date: "2025-10-03", aces: 7, errors: 2, duration: 45 },
    { date: "2025-10-05", aces: 4, errors: 5, duration: 50 },
  ]);

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Menu />
        <div style={{ flex: 1, padding: "1rem" }}>
          <div style={dashboardContainer}>
            {alertMessage && (
              <Alert type={alertMessage.type}>{alertMessage.text}</Alert>
            )}

            <h2 style={welcomeText}>Olá, {playerName} 👋</h2>

            <div style={cardsContainer}>
              <Card title="Total de Treinos">{trainingData.length}</Card>
              <Card title="Duração Média">
                {Math.round(
                  trainingData.reduce((acc, t) => acc + t.duration, 0) /
                    trainingData.length
                )}{" "}
                min
              </Card>
              <Card title="Aces Totais">
                {trainingData.reduce((acc, t) => acc + t.aces, 0)}
              </Card>
              <Card title="Erros Totais">
                {trainingData.reduce((acc, t) => acc + t.errors, 0)}
              </Card>
            </div>

            <div style={chartContainer}>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
