// src/components/missions/MissionFilter.jsx
import React from 'react';

export default function MissionFilter({ types, selected, onChange }) {
  return (
    <select value={selected} onChange={e => onChange(e.target.value)}>
      <option value="">Todas</option>
      {types.map(t => <option key={t} value={t}>{t}</option>)}
    </select>
  );
}
