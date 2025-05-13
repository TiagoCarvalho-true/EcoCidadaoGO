// src/components/map/TrashPointPopup.jsx
import React from 'react';
import { Popup } from 'react-leaflet';

export default function TrashPointPopup({ point }) {
  return (
    <Popup>
      <img src={point.photo} alt="" width={100} />
      <p>Tipo: {point.type}</p>
      <p>Data: {new Date(point.date).toLocaleDateString()}</p>
      <p>Status: {point.status}</p>
    </Popup>
  );
}
