// src/pages/MissionDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MissionDetailPage = () => {
  const { id } = useParams();
  const [missao, setMissao] = useState(null);
  const [concluida, setConcluida] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/missoes')
      .then(res => {
        const encontrada = res.data.find(m => m.id === parseInt(id));
        if (encontrada) setMissao(encontrada);
        else navigate('/missoes'); // se não encontrar, redireciona
      })
      .catch(err => console.error('Erro ao carregar missão:', err));
  }, [id, navigate]);

  const concluirMissao = () => {
    const token = localStorage.getItem('token');
    axios.post(`/api/missao-usuario/${id}/concluir`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert('Missão concluída com sucesso!');
        setConcluida(true);
      })
      .catch(err => alert('Erro ao concluir missão: ' + err.response?.data?.erro || err.message));
  };

  if (!missao) return <p>Carregando missão...</p>;

  return (
    <div className="mission-detail-page">
      <h1>{missao.titulo}</h1>
      <p>{missao.descricao}</p>
      <p><strong>Pontos:</strong> {missao.pontos}</p>
      <button onClick={concluirMissao} disabled={concluida}>
        {concluida ? 'Missão Concluída' : 'Concluir Missão'}
      </button>
    </div>
  );
};

export default MissionDetailPage;
