// src/components/auth/GoogleButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../services/authService';

const GoogleButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    }
  };

  return (
    <button 
      className="google-button" 
      onClick={handleGoogleLogin}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '10px 15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: 'white',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px'
      }}
    >
      <img 
        src="/assets/images/google.png" 
        alt="Google" 
        style={{ width: '20px', height: '20px' }}
      />
      Entrar com Google
    </button>
  );
};

export default GoogleButton;
