// src/pages/MissionsListPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './MissionDetailPage';
import './MissionsListPage.css';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header'


const MissionsListPage = () => {
  const [missoes, setMissoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/missoes')
      .then(res => setMissoes(res.data))
      .catch(err => console.error('Erro ao carregar missões:', err));
  }, []);

  return (
  <div className="layout-container">
    <Sidebar />
    <div className="main-content">
      <Header />
      <div className="missions-page">
        <h1 className="title">Missões</h1>
        <div className="missions-list">
          {missoes.map(missao => (
            <div key={missao.id} className="mission-card" onClick={() => navigate(`/missoes/${missao.id}`)}>
              <img src={`/assets/missoes/${missao.imagem}`} alt={missao.titulo} />
              <div className="mission-content">
                <h2>{missao.titulo}</h2>
                <p>{missao.descricao}</p>
                <p className="points">Pontos: {missao.pontos}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default MissionsListPage;
