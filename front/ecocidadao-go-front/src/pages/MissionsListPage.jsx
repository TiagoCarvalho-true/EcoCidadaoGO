// src/pages/MissionsListPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

import './MissionDetailPage';
import './MissionsListPage.css';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

import HomemComposteira from "../assets/images/homem-composteira.png";


const MissionsListPage = () => {
  const [missoes, setMissoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/missoes')
      .then(res => {
        if (Array.isArray(res.data)) {
          setMissoes(res.data);
        } else {
          console.error('Dados de missões não são um array:', res.data);
          setMissoes([]);
        }
      })
      .catch(err => {
        console.error('Erro ao carregar missões:', err);
        setMissoes([]);
      });
  }, []);

  return (
  <div className="layout-container">
    <Sidebar />
    <div className="main-content">
      <Header />
      <div className="missions-page">
        <h1 className="title">Missões</h1>
        <div className="missions-list">
          {Array.isArray(missoes) && missoes.map(missao => (
            <div key={missao.id} className="mission-card" onClick={() => navigate(`/missoes/${missao.id}`)}>
              <img src={HomemComposteira} alt={missao.titulo} />
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