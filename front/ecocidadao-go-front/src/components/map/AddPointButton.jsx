// src/components/map/AddPointButton.jsx
import React from 'react';

export default function AddPointButton({ onClick }) {
  return <button className="fab" onClick={onClick}>+ Novo Ponto</button>;
}

