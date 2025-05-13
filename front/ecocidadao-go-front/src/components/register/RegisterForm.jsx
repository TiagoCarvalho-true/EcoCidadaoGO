// src/components/register/RegisterForm.jsx
import React, { useState } from 'react';
import api from '../../api/axios';

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false });
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert('Senhas não conferem');
    try {
      await api.post('/auth/register', form);
      // redirecionar…
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>E-mail
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>Senha
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
      </label>
      <label>Confirmar Senha
        <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required />
      </label>
      <label>
        <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
        Aceito os Termos
      </label>
      <button type="submit">Registrar</button>
    </form>
  );
}
