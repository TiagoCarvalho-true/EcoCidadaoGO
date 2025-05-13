// src/components/dashboard/NotificationsList.jsx
import React from 'react';

export default function NotificationsList({ notifications }) {
  return (
    <ul>
      {notifications.map(n => (
        <li key={n.id}>{n.message} — <small>{n.date}</small></li>
      ))}
    </ul>
  );
}
