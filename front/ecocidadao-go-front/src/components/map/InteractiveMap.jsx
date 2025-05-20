import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TrashPointPopup from './TrashPointPopup';
import './InteractiveMap.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const fakePoints = [
  {
    id: 1,
    type: 'Plástico',
    date: new Date(),
    status: 'Pendente',
    photo: 'https://via.placeholder.com/100',
    position: [-15.7942, -47.8822],
  },
  {
    id: 2,
    type: 'Metal',
    date: new Date(),
    status: 'Recolhido',
    photo: 'https://via.placeholder.com/100',
    position: [-15.8000, -47.8800],
  }
];

export default function InteractiveMap() {
  return (
    <MapContainer center={[-3.119, -60.021]}
 zoom={13} style={{ height: '400px', width: '50%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fakePoints.map(point => (
        <Marker key={point.id} position={point.position}>
          <TrashPointPopup point={point} />
        </Marker>
      ))}
    </MapContainer>
  );
}
