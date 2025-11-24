import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";
import { showSuccess, showError } from "../components/Alert";

const TrainingContext = createContext();

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error("useTraining deve ser usado dentro de um TrainingProvider");
  }
  return context;
};

export const TrainingProvider = ({ children }) => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadUserTrainings = async () => {
    if (!user) {
      setTrainings([]);
      return;
    }

    setLoading(true);
    try {
      const trainingsQuery = query(
        collection(db, "trainings"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(trainingsQuery);
      const userTrainings = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (!data.deleted) {
          userTrainings.push({
            id: doc.id,
            date: data.date,
            duration: data.duration,
            aces: data.aces,
            errors: data.errors,
            doubleFaults: data.doubleFaults || 0,
            notes: data.notes || "",
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          });
        }
      });

      userTrainings.sort((a, b) => new Date(b.date) - new Date(a.date));

      setTrainings(userTrainings);
      return userTrainings;
    } catch (error) {
      console.error("Erro ao carregar treinos:", error);
      showError("Erro ao carregar treinos.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveTraining = async (trainingData) => {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    setLoading(true);
    try {
      const trainingWithMetadata = {
        ...trainingData,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, "trainings"),
        trainingWithMetadata
      );

      const newTraining = {
        id: docRef.id,
        ...trainingData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setTrainings((prev) => [newTraining, ...prev]);
      showSuccess("Treino registrado com sucesso!");

      return docRef.id;
    } catch (error) {
      console.error("Erro ao salvar treino:", error);
      showError("Erro ao salvar treino.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTraining = async (trainingId, trainingData) => {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    setLoading(true);
    try {
      const trainingRef = doc(db, "trainings", trainingId);
      const trainingWithMetadata = {
        ...trainingData,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(trainingRef, trainingWithMetadata);

      setTrainings((prev) =>
        prev.map((training) =>
          training.id === trainingId
            ? { ...training, ...trainingData, updatedAt: new Date() }
            : training
        )
      );

      showSuccess("Treino atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar treino:", error);
      showError("Erro ao atualizar treino.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTraining = async (trainingId) => {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    setLoading(true);
    try {
      const trainingRef = doc(db, "trainings", trainingId);
      await updateDoc(trainingRef, {
        deleted: true,
        updatedAt: serverTimestamp(),
      });

      setTrainings((prev) =>
        prev.filter((training) => training.id !== trainingId)
      );

      showSuccess("Treino excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir treino:", error);
      showError("Erro ao excluir treino.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserTrainings();
    } else {
      setTrainings([]);
    }
  }, [user]);

  const value = {
    trainings,
    loading,
    saveTraining,
    updateTraining,
    deleteTraining,
    loadUserTrainings,
    refreshTrainings: loadUserTrainings,
  };

  return (
    <TrainingContext.Provider value={value}>
      {children}
    </TrainingContext.Provider>
  );
};
