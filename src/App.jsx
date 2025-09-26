import { useState } from "react";
import Layout from "./components/Layout";
import Card from "./components/Card";
import Button from "./components/Button";
import Alert from "./components/Alert";
import Input from "./components/Input";
import Modal from "./components/Modal";
import Spinner from "./components/Spinner";
import List from "./components/List";
import "./index.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const items = ["Forehand", "Backhand", "Serviço"];

  return (
    <Layout>
      <Alert type="success">Treino registrado com sucesso!</Alert>

      <Card title="Treino de Hoje">
        Aces: 5 | Erros não forçados: 3 | Duração: 1h
      </Card>

      <Input
        label="Observações"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Button onClick={() => setModalOpen(true)}>Adicionar Treino</Button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Novo Treino"
      >
        <Input
          label="Tipo de Treino"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={() => alert("Treino salvo!")}>Salvar</Button>
      </Modal>

      <Spinner size={50} />

      <List items={items} renderItem={(item) => <strong>{item}</strong>} />
    </Layout>
  );
}

export default App;
