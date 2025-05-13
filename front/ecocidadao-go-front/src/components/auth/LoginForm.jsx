// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import api from '../../api/axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/login', { email, password });
      // redirecionar para dashboard…
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>E-mail
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>Senha
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Entrar</button>
    </form>
  );
}
