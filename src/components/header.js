import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style-header.css';

function Header() {
return (
    <header className="header-landing">
    <div className="wrap-logo">
        <img src="/Imagenes/logo.png" alt="Logo Serigrafia Gomez" className="logo-header" />
    </div>
    <div className="menu-header-section">
        <nav className="wrap-menu-header-section">
        <ul>
            <li><Link to="/">Inicio</Link></li> {/* Cambiado a Link */}
            <li><Link to="/servicios">Servicios</Link></li> {/* Cambiado a Link */}
            <li><Link to="/nosotros">Nosotros</Link></li> {/* Cambiado a Link */}
            <li><Link to="/contacto">Contacto</Link></li> {/* Cambiado a Link */}
            <li><Link to="/seguitupedido" className="cta-a-stp">Seguí tu pedido</Link></li> {/* Cambiado a Link */}
        </ul>
        </nav>
    </div>
    </header>
);
}

export default Header;
