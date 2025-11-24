import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { showSuccess, showError } from '../components/Alert';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }

      showSuccess('Conta criada com sucesso!');
      return userCredential;
    } catch (error) {
      let errorMessage = 'Erro ao criar conta.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este e-mail já está em uso.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'E-mail inválido.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Senha muito fraca. Use pelo menos 6 caracteres.';
          break;
        default:
          errorMessage = error.message;
      }
      
      showError(errorMessage);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      showSuccess('Login realizado com sucesso!');
      return userCredential;
    } catch (error) {
      let errorMessage = 'Erro ao fazer login.';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'E-mail inválido.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado. Verifique seu e-mail.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta. Tente novamente.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Credenciais inválidas. Verifique seu e-mail e senha.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas de login. Tente novamente mais tarde.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Esta conta foi desativada.';
          break;
        default:
          errorMessage = 'Erro ao fazer login. Tente novamente.';
      }
      
      showError(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      showSuccess('Logout realizado com sucesso!');
    } catch (error) {
      showError('Erro ao fazer logout.');
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      showSuccess('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      let errorMessage = 'Erro ao enviar e-mail de recuperação.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'E-mail não cadastrado no sistema.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'E-mail inválido.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
          break;
        default:
          errorMessage = 'Erro ao enviar e-mail de recuperação. Tente novamente.';
      }
      
      showError(errorMessage);
      throw error;
    }
  };

  const changePassword = async (newPassword) => {
    try {
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }
      
      await updatePassword(user, newPassword);
      showSuccess('Senha alterada com sucesso!');
    } catch (error) {
      let errorMessage = 'Erro ao alterar senha.';
      
      switch (error.code) {
        case 'auth/weak-password':
          errorMessage = 'Senha muito fraca. Use pelo menos 6 caracteres.';
          break;
        case 'auth/requires-recent-login':
          errorMessage = 'Por segurança, faça login novamente antes de alterar a senha.';
          break;
        default:
          errorMessage = 'Erro ao alterar senha. Tente novamente.';
      }
      
      showError(errorMessage);
      throw error;
    }
  };

  const updateUserProfile = async (displayName) => {
    try {
      if (!user) {
        throw new Error('Usuário não autenticado.');
      }
      
      await updateProfile(user, {
        displayName: displayName
      });
      
      setUser({
        ...user,
        displayName: displayName
      });
      
      showSuccess('Perfil atualizado com sucesso!');
    } catch (error) {
      showError('Erro ao atualizar perfil.');
      throw error;
    }
  };

  const value = {
    user,
    signUp,
    login,
    logout,
    resetPassword,
    changePassword,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};