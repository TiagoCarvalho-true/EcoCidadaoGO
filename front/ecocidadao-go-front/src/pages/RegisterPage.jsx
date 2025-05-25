import React, { useState } from 'react';
import api from '../api/axios';
import './RegisterPage.css';
import logo from '../assets/images/logo.png';
import googleIcon from '../assets/icons/google.png';
import facebookIcon from '../assets/icons/facebook.png';

export default function RegisterPage() {
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validações
    if (formData.password !== formData.confirmPassword) {
      return setError('As senhas não coincidem.');
    }

    if (!formData.terms) {
      return setError('Você deve aceitar os termos.');
    }

    // Objeto com os dados a serem enviados
    // No RegisterPage.jsx
const userData = {
  nome: formData.name,
  email: formData.email,
  senha: formData.password
};


    // Log para debug
    console.log('Dados sendo enviados:', userData);

    try {
      // Substitua esta linha
      const response = await api.post('/auth/register', userData);
      // Remove a configuração redundante dos headers pois já está no arquivo api/axios.js

      console.log('Resposta do servidor:', response.data);
      
      setSuccess('Conta criada com sucesso!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      console.error('Erro completo:', err);
      setError(err.response?.data?.message || 'Erro ao registrar');
    }
};

  return (
    <div className="register-container">
      <div className="register-panel left">
        <form onSubmit={handleSubmit}>
          <h2>Criação de Conta</h2>

          <div className="social-login">
            <img src={googleIcon} alt="Google" className="social-icon" />
            <img src={facebookIcon} alt="Facebook" className="social-icon" />
          </div>

          <span className="divider">OU</span>

          <input
            type="text"
            placeholder="Nome Completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Confirmar Senha"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="terms">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label>
              Eu Aceito os <a href="#">Termos e Condições</a>
            </label>
          </div>

          <button type="submit">Criar Conta</button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>

      <div className="register-panel right">
        <div className="logo-area">
          <img src={logo} alt="Eco Cidadão GO" className="logo-ecocidadao" />
          <h1>Eco<br />Cidadão<br />GO</h1>
        </div>
      </div>
    </div>
  );
}
