import React from "react";

export default function GreenButton({ children, icon, onClick }) {
  return (
    <button className="green-btn" onClick={onClick}>
      {children}
      {icon && <span className="green-btn-icon">{icon}</span>}
    </button>
  );
}