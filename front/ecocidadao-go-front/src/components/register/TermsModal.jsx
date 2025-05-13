// src/components/register/TermsModal.jsx
import React from 'react';

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Termos de Uso</h2>
        <p>…conteúdo dos termos…</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
