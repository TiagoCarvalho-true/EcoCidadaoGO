// src/components/map/InteractiveMap.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function InteractiveMap({ children }) {
  return (
    <MapContainer center={[0,0]} zoom={13} style={{ height: 400 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {children}
    </MapContainer>
  );
}
