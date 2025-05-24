import React, { useEffect, useState } from "react";
import UserPhoto from "./UserPhoto";
import Safezone from "./Safezone";
import Sidebar from "../common/Sidebar";
import "./UserProfileStyles.css";
import { Link, useNavigate } from 'react-router-dom';
import api from "../../api/axios";

export default function ContainerUser() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await api.get("/usuarios/perfil");
        console.log("Dados recebidos:", response.data); // Debug
        
        if (response.data && response.data.user) {
          setUsuario(response.data.user);
        } else {
          setError("Dados do usuário não encontrados");
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setError(error.response?.data?.message || "Erro ao carregar perfil");
        
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container">
        <Sidebar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando seu perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Sidebar />
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => navigate('/dashboard')} className="btn">
            Voltar para Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="container">
        <Sidebar />
        <div className="error-container">
          <p>Nenhum dado encontrado</p>
          <button onClick={() => navigate('/dashboard')} className="btn">
            Voltar para Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="container-user">
        <Sidebar />
        <div className="profile-content">
          <UserPhoto nome={usuario.nome} email={usuario.email} />
          <Safezone
            concluidas={usuario.missoesConcluidas || 0}
            pendentes={usuario.missoesPendentes || 0}
            nivel={usuario.nivel || 1}
            experiencia={usuario.experiencia || 0}
          />
          <div className="buttons">
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
              }} 
              className="btn logout"
            >
              Sair da Conta
            </button>
            <Link to="/login" className="btn delete">Deletar Conta</Link>
          </div>
        </div>
      </div>
    </div>
  );
}