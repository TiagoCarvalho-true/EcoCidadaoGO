import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import './LoginPage.css';

import GoogleButton from './GoogleButton';



export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-panel left">
        <div className="logo-area">
          <img src="/assets/images/logo.png" alt="Eco Cidadão GO" className="logo-ecocidadao" />
          <h1>Eco Cidadão<br />GO</h1>
        </div>
      </div>

      <div className="login-panel right">
        <h2>Login de Conta</h2>
        <div className="social-login">
        <GoogleButton />
          
        </div>
        <LoginForm />
        <p className="register-link">
          Não possui uma conta? <a href="/register">Faça Registro</a>
        </p>
      </div>
    </div>
  );
}