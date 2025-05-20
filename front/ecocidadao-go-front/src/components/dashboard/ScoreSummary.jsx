// src/components/dashboard/ScoreSummary.jsx
import React from 'react';
import './ScoreSummary.css';

export default function ScoreSummary({ score = 15, rank = 3 }) {
  return (
    <div className="score-panel">
      <div className="score-summary">
        <h3>Pontuação Total</h3>
        <div className="score-value">{score} pontos</div>
        <p className="rank-info">Sua posição: #{rank}</p>
      </div>
      
      {/*<div className="missions-panel">
        <h3>Missões Completadas</h3>
        <div className="missions-list">
          <p>✔ Quebra dos recicláveis</p>
          <p>✔ Checar lixo</p>
          <p>✔ Qtd de resíduos</p>
        </div>
      </div>

      <div className="ranking-panel">
        <h3>Ranking</h3>
        <div className="ranking-list">
          <p>🏆 Fulano: 30pts</p>
          <p>🏆 Beltrano: 22pts</p>
          <p>🏆 Você: 15pts</p>
        </div>
      </div>*/}
    </div>
  );
}