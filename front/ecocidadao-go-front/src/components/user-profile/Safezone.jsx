import React from "react";
import "./UserProfileStyles.css";
import cavaleiroImg from "../../assets/images/cavaleiro.png";

export default function Safezone({ concluidas, pendentes, nivel, experiencia }) {
  return (
    <div className="safezone-box">
      <img src={cavaleiroImg} alt="cavaleiro" />
      <div className="safezone-info">
        <h2>SAFEZONE</h2>
        <ul>
          <li>{concluidas} Missões Feitas</li>
          <li>{pendentes} Missões Para Fazer</li>
          <li>2 Pets Capturados</li>
          <li>Nível: {nivel}</li>
          <li>Experiência: {experiencia}</li>
        </ul>
      </div>
    </div>
  );
}
