// src/components/map/SidePanelList.jsx
import React from 'react';

export default function SidePanelList({ points, onSelect }) {
  return (
    <aside>
      {points.map(p => (
        <div key={p.id} onClick={() => onSelect(p)}>
          <strong>{p.type}</strong><br/>
          {new Date(p.date).toLocaleDateString()}
        </div>
      ))}
    </aside>
  );
}
