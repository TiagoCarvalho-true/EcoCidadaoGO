// src/components/trash-point/LocationPicker.jsx
import React from 'react';

export default function LocationPicker({ onLocation }) {
  const getGPS = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      onLocation(pos.coords.latitude, pos.coords.longitude);
    });
  };
  return <button onClick={getGPS}>Usar minha localização</button>;
}
