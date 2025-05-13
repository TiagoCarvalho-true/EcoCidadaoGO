// src/components/dashboard/ScoreSummary.jsx
import React from 'react';

export default function ScoreSummary({ score, rank }) {
  return (
    <div>
      <h3>Você tem {score} pontos</h3>
      <p>Posição no ranking: {rank}</p>
    </div>
  );
}
