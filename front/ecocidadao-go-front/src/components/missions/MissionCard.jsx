// src/components/missions/MissionCard.jsx
import React from 'react';

export default function MissionCard({ mission, onComplete }) {
  return (
    <div className="mission-card">
      <h4>{mission.title}</h4>
      <p>{mission.description}</p>
      <span>{mission.points} pts</span>
      <button onClick={() => onComplete(mission.id)}>
        {mission.done ? 'Concluída' : 'Concluir'}
      </button>
    </div>
  );
}
