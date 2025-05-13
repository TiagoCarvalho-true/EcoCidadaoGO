// src/components/dashboard/ShortcutCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ShortcutCard({ title, icon, to }) {
  return (
    <Link to={to} className="shortcut-card">
      {icon && <img src={icon} alt="" />}
      <span>{title}</span>
    </Link>
  );
}
