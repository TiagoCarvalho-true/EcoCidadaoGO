import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import GreenButton from "../components/common/GreenButtons";
import "../components/common/GreenButtons.css";
import "leaflet/dist/leaflet.css";
import "./MapPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import iconeLixo from '../assets/icons/salocadelixo.png';

// Exemplo de ícone SVG (você pode trocar por <img src={icone} ... /> 
const FormIcon = () => (
  <span role="img" aria-label="form">👜</span>
);

// Ícone customizado para o marcador
const customIcon = new L.Icon({
  iconUrl: iconeLixo,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Modal simples
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
}

// Formulário em etapas
function FormularioPopup({ open, onClose, setMarkerPosition, setUltimaColeta }) {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tipoResiduo, setTipoResiduo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Função para atualizar a localização nos inputs
  function atualizarLocalizacao() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          setLatitude("");
          setLongitude("");
        }
      );
    }
  }

  // Atualiza localização ao abrir o formulário
  useEffect(() => {
    if (open) {
      atualizarLocalizacao();
    }
  }, [open]);

  // Atualiza localização ao clicar em "Novo formulário"
  function handleRestart() {
    setStep(1);
    setImage(null);
    setImagePreview(null);
    setTipoResiduo("");
    atualizarLocalizacao();
  }

  function handleContinue() {
    if (step === 2) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMarkerPosition([position.coords.latitude, position.coords.longitude]);
            setUltimaColeta({
              imagePreview,
              tipoResiduo,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            setMarkerPosition([parseFloat(latitude), parseFloat(longitude)]);
            setUltimaColeta({
              imagePreview,
              tipoResiduo,
              latitude,
              longitude,
            });
          }
        );
      } else {
        setMarkerPosition([parseFloat(latitude), parseFloat(longitude)]);
        setUltimaColeta({
          imagePreview,
          tipoResiduo,
          latitude,
          longitude,
        });
      }
    }
    setStep(step + 1);
  }

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleTipoChange(e) {
    setTipoResiduo(e.target.value);
  }

  return (
    <Modal open={open} onClose={onClose}>
      {step === 1 && (
        <div>
          <h3>Envie uma imagem (Max: 1 Imagem)</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={!!image}
          />
          {image && <p>Imagem selecionada: {image.name}</p>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: 180,
                height: 180,
                objectFit: "cover",
                marginTop: 12,
                borderRadius: 8,
                border: "2px solid #2ecc40"
              }}
            />
          )}
          <button
            onClick={handleContinue}
            disabled={!image}
            style={{ marginTop: 16 }}
          >
            Continuar
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3>Tipo de Resíduo</h3>
          <select value={tipoResiduo} onChange={handleTipoChange}>
            <option value="">Selecione...</option>
            <option value="orgânicos">Resíduos Orgânicos</option>
            <option value="recicláveis">Materiais Recicláveis</option>
            <option value="especiais">Resíduos Especiais</option>
            <option value="rejeito">Rejeito</option>
          </select>
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            style={{
              background: "#eaffea",
              border: "2px solid #2ecc40",
              borderRadius: 6,
              color: "#0a3d0a",
              padding: "8px 12px",
              marginTop: 10,
              fontSize: "1rem",
              fontFamily: "inherit",
              transition: "border 0.2s",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            style={{
              background: "#eaffea",
              border: "2px solid #2ecc40",
              borderRadius: 6,
              color: "#0a3d0a",
              padding: "8px 12px",
              marginTop: 10,
              fontSize: "1rem",
              fontFamily: "inherit",
              transition: "border 0.2s",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
          <button
            onClick={handleContinue}
            disabled={!tipoResiduo}
            style={{ marginTop: 16 }}
          >
            Continuar
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h3>Formulário preenchido com sucesso!</h3>
          <div className="step3-buttons" style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button onClick={handleRestart}>Novo formulário</button>
            <button onClick={onClose}>Fechar</button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default function MapHomePage() {
  const [formOpen, setFormOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState([-3.119, -60.021]);
  const [ultimaColeta, setUltimaColeta] = useState(null);

  // Centraliza o mapa na localização do usuário ao abrir a página
  useEffect(() => {
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {

        }
      );
    }
    // Limpa o watcher ao desmontar o componente
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="map-home-page">
      <Header />
      <Sidebar />
      <main className="map-main-content">
        <h2 className="map-title-pixel">Bora coletar!</h2>
        <div className="map-area">
          <MapContainer
            center={mapCenter}
            zoom={13}
            className="map-leaflet"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Exemplo de marcador fixo */}
            <Marker position={[-3.119, -60.021]} />
            {/* Marcador customizado após o formulário */}
            {markerPosition && ultimaColeta && (
              <Marker position={markerPosition} icon={customIcon}>
                <Popup>
                  <div style={{ maxWidth: 220 }}>
                    <strong>Tipo de Resíduo:</strong> {ultimaColeta.tipoResiduo}<br />
                    <strong>Latitude:</strong> {ultimaColeta.latitude}<br />
                    <strong>Longitude:</strong> {ultimaColeta.longitude}<br />
                    {ultimaColeta.imagePreview && (
                      <img
                        src={ultimaColeta.imagePreview}
                        alt="Foto do resíduo"
                        style={{
                          width: "100%",
                          maxWidth: 200,
                          marginTop: 20,
                          borderRadius: 8,
                          border: "2px solidrgb(110, 255, 127)",
                          objectFit: "cover"
                        }}
                      />
                    )}
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
        <div className="map-bottom-buttons">
          <GreenButton icon={<FormIcon />} onClick={() => setFormOpen(true)}>
            Formulario
          </GreenButton>
        </div>
        <FormularioPopup
          open={formOpen}
          onClose={() => setFormOpen(false)}
          setMarkerPosition={setMarkerPosition}
          setUltimaColeta={setUltimaColeta}
        />
      </main>
    </div>
  );
}