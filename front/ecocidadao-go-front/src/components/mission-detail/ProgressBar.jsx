// src/components/mission-detail/ProgressBar.jsx
import React from 'react';

export default function ProgressBar({ current, total }) {
  const pct = Math.min(100, (current / total) * 100);
  return (
    <div className="progress-bar">
      <div style={{ width: `${pct}%` }} />
      <span>{current}/{total}</span>
    </div>
  );
}
