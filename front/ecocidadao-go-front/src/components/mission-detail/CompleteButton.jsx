// src/components/mission-detail/CompleteButton.jsx
import React, { useState } from 'react';
import api from '../../api/axios';

export default function CompleteButton({ missionId, disabled = false, onCompleted }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
      await api.post(`/missoes-usuario/${missionId}/concluir`);
      if (onCompleted) onCompleted();
    } catch (error) {
      console.error('Erro ao concluir missão:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={disabled || loading}>
      {loading ? 'Concluindo...' : 'Concluir Missão'}
    </button>
  );
}
