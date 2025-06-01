import { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const notificationsMock = [
  { id: 1, message: 'Você ganhou 10 pontos por registrar uma coleta!' },
  { id: 2, message: 'Você ganhou 5 pontos por completar seu perfil!' },
  { id: 3, message: 'Você ganhou 20 pontos por indicar um amigo!' },
  { id: 4, message: 'Você ganhou 15 pontos por compartilhar nas redes sociais!' },
  { id: 5, message: 'Você ganhou 40 pontos por completar uma tarefa!' },
  { id: 6, message: 'Você ganhou 70 pontos por fazer um cadastro!' },
];

function NotificationPopup({ open, onClose, notifications }) {
  if (!open) return null;
  return (
    <div className="notification-popup-overlay" onClick={onClose}>
      <div className="notification-popup" onClick={e => e.stopPropagation()}>
        <div className="notification-popup-header">
          <span>Notificações</span>
          <button className="notification-popup-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <ul className="notification-popup-list">
          {notifications.length === 0 ? (
            <li className="notification-popup-empty">Nenhuma notificação.</li>
          ) : (
            notifications.map(n => (
              <li key={n.id} className="notification-popup-item">
                {n.message}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Eco Cidadão GO" className="logo" />
        <h1>Eco Cidadão GO</h1>
      </div>

      <div className="header-right">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="icon-button" title="Voltar para a tela inicial" style={{marginRight: 8}}>
              <i className="bi bi-house-door-fill"></i>
            </Link>
            <Link to="/perfil" className="icon-button">
              <i className="bi bi-person-fill"></i>
            </Link>
            <button
              type="button"
              className="icon-button notification"
              onClick={handleNotificationClick}
            >
              <i className="bi bi-bell-fill"></i>
            </button>
            <button onClick={handleLogout} className="register-button">
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="icon-button" title="Voltar para a tela inicial" style={{marginRight: 8}}>
              <i className="bi bi-house-door-fill"></i>
            </Link>
            <Link to="/login" className="icon-button">
              <i className="bi bi-person-fill"></i>
            </Link>
            <button
              type="button"
              className="icon-button notification"
              onClick={handleNotificationClick}
            >
              <i className="bi bi-bell-fill"></i>
            </button>
            <Link to="/register" className="register-button">
              Registrar
            </Link>
          </>
        )}
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        <i className="bi bi-list"></i>
      </button>

      <nav className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>
              <i className="bi bi-house-door-fill"></i> Voltar para a tela inicial
            </Link>
            <Link to="/perfil" className="nav-link" onClick={toggleMenu}>
              Perfil
            </Link>
            <button
              type="button"
              className="nav-link btn-black"
              style={{ background: 'none', border: 'none', color: 'white', padding: 0 }}
              onClick={() => { handleNotificationClick(); toggleMenu(); }}
            >
              Notificações
            </button>
            <button onClick={handleLogout} className="nav-link btn-black">
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>
               Voltar para a tela inicial
            </Link>
            <Link to="/login" className="nav-link" onClick={toggleMenu}>
              Login
            </Link>
            <button
              type="button"
              className="nav-link btn-black"
              style={{ background: 'none', border: 'none', color: 'white', padding: 0 }}
              onClick={() => { handleNotificationClick(); toggleMenu(); }}
            >
              Notificações
            </button>
            <Link to="/register" className="nav-link btn-black" onClick={toggleMenu}>
              Registrar
            </Link>
          </>
        )}
      </nav>

      <NotificationPopup
        open={showNotifications}
        onClose={handleCloseNotifications}
        notifications={notificationsMock}
      />
    </header>
  );
};

export default Header;