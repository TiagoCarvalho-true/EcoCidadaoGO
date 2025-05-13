// src/components/mission-detail/MissionDetails.jsx
import React from 'react';

export default function MissionDetails({ mission }) {
  return (
    <div>
      <h2>{mission.title}</h2>
      <p>{mission.description}</p>
      <p>Recompensa: {mission.points} pontos</p>
    </div>
  );
}
