import { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Eco Cidadão GO" className="logo" />
        <h1>Eco Cidadão GO</h1>
      </div>

      <div className="header-right">
        {isLoggedIn ? (
          <>
            <Link to="/perfil" className="icon-button">
              <i className="bi bi-person-fill"></i>
            </Link>
            <button onClick={handleLogout} className="register-button">
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="icon-button">
              <i className="bi bi-person-fill"></i>
            </Link>
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
            <Link to="/perfil" className="nav-link">
              Perfil
            </Link>
            <button onClick={handleLogout} className="nav-link btn-black">
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link btn-black">
              Registrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
