import React from "react";
import UserPhoto from "./UserPhoto";
import Safezone from "./Safezone";
import Sidebar from "../common/Sidebar";
import "./UserProfileStyles.css";
import { Link } from 'react-router-dom';

export default function ContainerUser() {
  return (
    <div className="container">
      <div className="container-user">
      <Sidebar />
      <div className="profile-content">
        <UserPhoto />
        <Safezone />
        <div className="buttons">
          <Link to="/register" className="btn logout">
            Sair da Conta
          </Link>
          <Link to="/login" className="btn delete">
            Deletar Conta
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}