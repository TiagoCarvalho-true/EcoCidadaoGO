import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RankingPage.css';

import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

export default function RankingPage() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    axios.get('/ranking')
      .then(res => setRanking(res.data))
      .catch(err => console.error('Erro ao buscar ranking:', err));
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
              {ranking.map((user, index) => (
                <tr key={index} className={index === 0 ? 'highlight' : ''}>
                  <td>{user.nome}</td>
                  <td>
                    <img
                      src={`/assets/pets/${user.pet || 'pet1.png'}`}
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
