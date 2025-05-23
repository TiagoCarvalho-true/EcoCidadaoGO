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

const FormIcon = () => (
  <span role="img" aria-label="form">👜</span>
);

const customIcon = new L.Icon({
  iconUrl: iconeLixo,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const userIcon = new L.Icon.Default();

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

// Busca endereço completo pelo ViaCEP
async function buscarEnderecoPorCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");
  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  const data = await response.json();
  if (!data.erro) {
    return data;
  }
  return null;
}

// Busca coordenadas pelo endereço (Nominatim OpenStreetMap)
async function buscarCoordenadasPorEndereco(enderecoCompleto) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto + ', Brasil')}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  }
  return null;
}

function FormularioPopup({ open, onClose, adicionarColeta }) {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tipoResiduo, setTipoResiduo] = useState("");
  const [cep, setCep] = useState("");
  const [geoError, setGeoError] = useState("");
  const [endereco, setEndereco] = useState(null);

  // Preenche o CEP automaticamente ao chegar na etapa 2
  useEffect(() => {
    async function preencherCepAutomaticamente() {
      if (step === 2 && cep === "") {
        let lat = -3.119;
        let lon = -60.021;
        if (navigator.geolocation) {
          await new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                resolve();
              },
              () => resolve(),
              { timeout: 5000 }
            );
          });
        }
        // Busca o CEP pelo Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&country=Brazil&format=json`
        );
        const data = await response.json();
        // Só preenche se não for genérico (ex: 69000000)
        if (data && data.address && data.address.postcode && !/^69000/.test(data.address.postcode)) {
          setCep(data.address.postcode.replace("-", ""));
        } else {
          setCep(""); // Não preenche se for genérico
        }
      }
    }
    preencherCepAutomaticamente();
    // eslint-disable-next-line
  }, [step]);

  // Quando o usuário digita um CEP, busca o endereço pelo ViaCEP
  useEffect(() => {
    async function buscarEndereco() {
      if (cep.length >= 8) {
        const enderecoViaCep = await buscarEnderecoPorCep(cep);
        if (enderecoViaCep) {
          setEndereco(enderecoViaCep);
          setGeoError("");
        } else {
          setEndereco(null);
          setGeoError("CEP não encontrado.");
        }
      } else {
        setEndereco(null);
      }
    }
    buscarEndereco();
  }, [cep]);

  function handleRestart() {
    setStep(1);
    setImage(null);
    setImagePreview(null);
    setTipoResiduo("");
    setCep("");
    setGeoError("");
    setEndereco(null);
  }

  async function handleContinue() {
    if (step === 2) {
      if (!cep || !endereco) {
        setGeoError("Informe um CEP válido.");
        return;
      }

      // Tenta várias combinações, incluindo só o CEP
      let tentativas = [
        [endereco.logradouro, endereco.bairro, endereco.localidade, endereco.uf].filter(Boolean).join(', '),
        [endereco.bairro, endereco.localidade, endereco.uf].filter(Boolean).join(', '),
        [endereco.localidade, endereco.uf].filter(Boolean).join(', '),
        endereco.cep // Tenta só o CEP puro
      ];

      let coords = null;
      for (let tentativa of tentativas) {
        if (tentativa && tentativa.trim().length > 0) {
          coords = await buscarCoordenadasPorEndereco(tentativa);
          if (coords) break;
        }
      }

      if (coords) {
        // Adiciona nova coleta ao array
        adicionarColeta({
          imagePreview,
          tipoResiduo,
          cep: endereco.cep,
          bairro: endereco.bairro,
          logradouro: endereco.logradouro,
          localidade: endereco.localidade,
          uf: endereco.uf,
          latitude: coords.lat,
          longitude: coords.lon,
        });
        setGeoError("");
        setStep(step + 1);
      } else {
        setGeoError("Não foi possível localizar o endereço no mapa.");
      }
    } else {
      setStep(step + 1);
    }
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
            placeholder="CEP"
            value={cep}
            onChange={e => setCep(e.target.value.replace(/\D/g, ""))}
            maxLength={8}
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
          {endereco && (
            <div style={{ marginTop: 8, fontSize: "0.95rem", color: "#0a3d0a" }}>
              <div><strong>Logradouro:</strong> {endereco.logradouro}</div>
              <div><strong>Bairro:</strong> {endereco.bairro}</div>
              <div><strong>Cidade:</strong> {endereco.localidade}</div>
              <div><strong>UF:</strong> {endereco.uf}</div>
            </div>
          )}
          {geoError && (
            <div style={{ color: "red", marginTop: 8 }}>{geoError}</div>
          )}
          <button
            onClick={handleContinue}
            disabled={!tipoResiduo || !cep || !endereco}
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
  const [coletas, setColetas] = useState([]);
  const [mapCenter, setMapCenter] = useState([-3.119, -60.021]);
  const [userPosition, setUserPosition] = useState(null);

  function atualizarLocalizacaoUsuario() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMapCenter([lat, lng]);
          setUserPosition([lat, lng]);
        },
        () => {
          alert("Não foi possível obter sua localização.");
        }
      );
    } else {
      alert("Geolocalização não suportada pelo navegador.");
    }
  }

  useEffect(() => {
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        }
      );
    }
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
            {userPosition && (
              <Marker position={userPosition} icon={userIcon}>
                <Popup>
                  <div>
                    <strong>Sua localização atual</strong>
                  </div>
                </Popup>
              </Marker>
            )}
            {coletas.map((coleta, idx) => (
              <Marker
                key={idx}
                position={[coleta.latitude, coleta.longitude]}
                icon={customIcon}
              >
                <Popup>
                  <div style={{ maxWidth: 240 }}>
                    <strong>Tipo de Resíduo:</strong> {coleta.tipoResiduo}<br />
                    <strong>CEP:</strong> {coleta.cep}<br />
                    <strong>Logradouro:</strong> {coleta.logradouro}<br />
                    <strong>Bairro:</strong> {coleta.bairro}<br />
                    <strong>Cidade:</strong> {coleta.localidade}<br />
                    <strong>UF:</strong> {coleta.uf}<br />
                    {coleta.imagePreview && (
                      <img
                        src={coleta.imagePreview}
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
        </div>
        <div className="map-bottom-buttons">
          <GreenButton icon={<FormIcon />} onClick={() => setFormOpen(true)}>
            Formulario
          </GreenButton>
          <GreenButton onClick={atualizarLocalizacaoUsuario}>
            Atualizar localização
          </GreenButton>
        </div>
        <FormularioPopup
          open={formOpen}
          onClose={() => setFormOpen(false)}
          adicionarColeta={(coleta) => setColetas((prev) => [...prev, coleta])}
        />
      </main>
    </div>
  );
}