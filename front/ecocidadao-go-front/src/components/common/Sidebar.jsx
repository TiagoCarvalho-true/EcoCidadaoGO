import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

import flagIcon from '../../assets/icons/flag.png';
import starIcon from '../../assets/icons/star.png';
import mapIcon from '../../assets/icons/map.png';


export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { to: '/missions', icon: flagIcon, alt: 'Missões' },
    { to: '/ranking', icon: starIcon, alt: 'Ranking' },
    { to: '/map', icon: mapIcon, alt: 'Mapa' },
   
  ];

  return (
    <nav className="sidebar">
      {navItems.map((item, index) => (
        <Link 
          key={index} 
          to={item.to} 
          className={location.pathname === item.to ? 'active' : ''}
        >
          <img src={item.icon} alt={item.alt} className="sidebar-icon" />
        </Link>
      ))}
    </nav>
  );
}
