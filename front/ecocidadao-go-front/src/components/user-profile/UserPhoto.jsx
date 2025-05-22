import React from "react";
import "./UserProfileStyles.css";

export default function UserPhoto() {
  return (
    <div className="user-photo">
      <div className="avatar">
        <i className="bi bi-person-fill"></i>
      </div>
      <h2 className="username">Pythonildo</h2>
      <p className="email">pythonnildo@gmail.com</p>
    </div>
  );
}
