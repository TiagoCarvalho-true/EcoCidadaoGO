import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import './RankingPage.css';

import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import cavaleiro from '../assets/images/cavaleiro.png';

export default function RankingPage() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    api.get('/ranking')
      .then(res => {
        if (Array.isArray(res.data)) {
          setRanking(res.data);
        } else {
          console.error('Dados de ranking não são um array:', res.data);
          setRanking([]);
        }
      })
      .catch(err => {
        console.error('Erro ao buscar ranking:', err);
        setRanking([]);
      });
  }, []);

  return (
    <div className="ranking-page">
      <Sidebar />

      <div className="ranking-content-wrapper">
        <Header />

        <div className="ranking-main-content">
          <div className="ranking-title">
            <h1>Ranking</h1>
          </div>

          <table className="ranking-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Pet</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(ranking) && ranking.map((user, index) => (
                <tr key={index} className={index === 0 ? 'highlight' : ''}>
                  <td>{user.nome}</td>
                  <td>
                    <img
                      src={cavaleiro}
                      alt="pet"
                      className="pet-img"
                    />
                  </td>
                  <td>{user.pontuacao}pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}