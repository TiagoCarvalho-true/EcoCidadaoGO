import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import api from '../api/axios';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Obter o token ID do Google
    const idToken = await user.getIdToken();
    
    // Enviar o token para o backend para verificação
    const response = await api.post('/auth/google', {
      idToken
    });
    
    // Salvar o token JWT retornado pelo backend
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data.user;
  } catch (error) {
    console.error('Erro ao fazer login com Google:', error);
    throw error;
  }
};