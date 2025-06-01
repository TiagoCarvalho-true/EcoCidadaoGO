import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './InteractiveMap.css';
import iconeLixo from '../../assets/icons/salocadelixo.png';

const customIcon = new L.Icon({
  iconUrl: iconeLixo,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function InteractiveMap() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const salvas = localStorage.getItem('coletas');
    if (salvas) setPoints(JSON.parse(salvas));
  }, []);

  useEffect(() => {
    const atualizar = () => {
      const salvas = localStorage.getItem('coletas');
      if (salvas) setPoints(JSON.parse(salvas));
      else setPoints([]);
    };
    window.addEventListener('storage', atualizar);
    return () => window.removeEventListener('storage', atualizar);
  }, []);

  return (
    <MapContainer center={[-3.119, -60.021]} zoom={13} className='map'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point, idx) => (
        <Marker
          key={idx}
          position={[point.latitude, point.longitude]}
          icon={customIcon}
        >
          <Popup>
            <div style={{ maxWidth: 240 }}>
              <strong>Tipo de Resíduo:</strong> {point.tipoResiduo}<br />
              <strong>CEP:</strong> {point.cep}<br />
              <strong>Logradouro:</strong> {point.logradouro}<br />
              <strong>Bairro:</strong> {point.bairro}<br />
              <strong>Cidade:</strong> {point.localidade}<br />
              <strong>UF:</strong> {point.uf}<br />
              {point.imagePreview && (
                <img
                  src={point.imagePreview}
                  alt="Foto do resíduo"
                  style={{
                    width: "100%",
                    maxWidth: 200,
                    marginTop: 20,
                    borderRadius: 8,
                    border: "2px solid rgb(110, 255, 127)",
                    objectFit: "cover"
                  }}
                />
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
//limpa o local storage
/*window.onbeforeunload = () => {
  localStorage.removeItem('coletas');
};
*/