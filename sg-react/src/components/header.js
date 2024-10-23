import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

function Header() {
    return (
        <header className="header-landing">
            <div className="wrap-logo">
                <img src="/Imagenes/logo.png" alt="Logo Serigrafia Gomez" className="logo-header" />
            </div>
            <div className="menu-header-section">
                <nav className="wrap-menu-header-section">
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/servicios">Servicios</Link></li>
                        <li><Link to="/nosotros">Nosotros</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li><Link to="/seguitupedido" className="cta-a">
                            <img src="/Imagenes/ingresar.png" alt="Ingresar" />
                        </Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
