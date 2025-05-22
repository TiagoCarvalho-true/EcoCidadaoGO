import React from "react";
import "./UserProfileStyles.css";
import cavaleiroImg from "../../assets/images/cavaleiro.png";

export default function Safezone() {
  return (
    <div className="safezone-box">
        <img src={cavaleiroImg} alt="cavaleiro" />

      <div className="safezone-info">
        <h2>SAFEZONE</h2>
        <ul>
          <li>2 Missoes Feitas</li>
          <li>3 Missioes Para fazer</li>
          <li>2 Pets Capurados</li>
          <li>Nivel: 2</li>
          <li>Experiencia: 50</li>
        </ul>
      </div>
    </div>
    
  );
}