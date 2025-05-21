import React from 'react';
import './RankingPage.css';

import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const fakeRanking = [
  { name: 'Fulano de tal', points: 230, pet: 'pet1.png', highlight: true },
  { name: 'Zé mane', points: 155, pet: 'pet2.png' },
  { name: 'Jack', points: 55, pet: 'pet2.png' },
  { name: 'O Batatinha', points: 55, pet: 'pet2.png' },
  { name: 'Arroz raivoso', points: 55, pet: 'pet2.png' },
  { name: 'Trovão chegando', points: 55, pet: 'pet1.png' },
  { name: 'Steve', points: 55, pet: 'pet1.png' },
];

export default function RankingPage() {
  return (
    <div className="ranking-page">
      <Sidebar />

      <div className="ranking-content-wrapper">
        <Header />

        <div className="ranking-main-content">
          <div className="ranking-title">
            <h1>
              Ranking <span className="score">Score: 15</span>
            </h1>
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
              {fakeRanking.map((user, index) => (
                <tr key={index} className={user.highlight ? 'highlight' : ''}>
                  <td>{user.name}</td>
                  <td>
                    <img src={`/assets/pets/${user.pet}`} alt="pet" className="pet-img" />
                  </td>
                  <td>{user.points}pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
