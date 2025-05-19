// src/components/dashboard/NotificationsList.jsx
import React from 'react';
import './NotificationsList.css';

export default function NotificationsList(props) {
  const notifications = props.notifications || [];

  return (
    <div className="notifications-panel">
      <h3>Notificações</h3>
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map(n => (
            <div key={n.id} className="notification-item">
              <p className="notification-title">{n.title}</p>
              <small className="notification-date">{n.date}</small>
            </div>
          ))
        ) : (
          <p className="no-notifications">Nenhuma notificação</p>
        )}
      </div>
    </div>
  );
}