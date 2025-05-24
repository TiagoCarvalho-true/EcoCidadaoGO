
import React from "react";
import "./UserProfileStyles.css";

export default function UserPhoto({ nome, email }) {
  return (
    <div className="user-photo">
      <div className="avatar">
        <i className="bi bi-person-fill"></i>
      </div>
      <h2 className="username">{nome}</h2>
      <p className="email">{email}</p>
    </div>
  );
}
