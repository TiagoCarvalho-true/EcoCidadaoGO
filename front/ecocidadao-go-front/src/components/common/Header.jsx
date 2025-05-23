import { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Eco Cidadão GO" className="logo" />
        <h1>Eco Cidadão GO</h1>
      </div>

      <div className="header-right">
        <Link to="/profile" className="icon-button">
          <i className="bi bi-person-fill"></i>
        </Link>

        <Link to="/notifications" className="icon-button notification">
          <i className="bi bi-bell-fill"></i>
        </Link>

        <Link to="/register" className="register-button">
          Registrar
        </Link>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        <i className="bi bi-list"></i>
      </button>

      <nav className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/user" className="nav-link">
          Usuário
        </Link>
        <Link to="/notifications" className="nav-link">
          Notificações
        </Link>
        <Link to="/register" className="nav-link btn-black">
          Registrar
        </Link>
      </nav>
    </header>
  );
};

export default Header;
