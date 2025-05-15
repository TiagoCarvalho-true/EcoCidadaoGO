// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import './LoginPage.css';

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-panel left">
        <div className="logo-area">
      <img 
  src="/assets/images/logo.png"  // Simplificando o caminho
  alt="Eco Cidadão GO" 
  className="logo" 
/>
          <h1>Eco Cidadão<br />GO</h1>
        </div>
      </div>
      <div className="login-panel right">
        <LoginForm />
      </div>
    </div>
  );
}
