// src/components/trash-point/TrashPointForm.jsx
import React, { useState } from 'react';
import api from '../../api/axios';

export default function TrashPointForm({ onSuccess }) {
  const [form, setForm] = useState({ type: '', photo: null, lat: '', lng: '' });
  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('type', form.type);
    data.append('photo', form.photo);
    data.append('latitude', form.lat);
    data.append('longitude', form.lng);
    await api.post('/localizacoes', data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Foto
        <input type="file" name="photo" onChange={handleChange} required />
      </label>
      <label>Tipo de Resíduo
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="plastico">Plástico</option>
          <option value="papel">Papel</option>
          {/* … */}
        </select>
      </label>
      <label>Latitude
        <input name="lat" value={form.lat} onChange={handleChange} required />
      </label>
      <label>Longitude
        <input name="lng" value={form.lng} onChange={handleChange} required />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
