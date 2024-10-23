import React from 'react';
import '../css/footer.css'; 

function Footer() {
return (
    <footer className="footer-section">
    <div className="wrap-footer-section">
        <div className="wrap-social-logos">
        <ul>
            <li>
            <a href="https://www.instagram.com/serigrafiagomez/">
                <img src="/Imagenes/instagram.svg" alt="Instagram" className="social-logo" />
            </a>
            </li>
            <li>
            <a href="https://www.facebook.com/SerigrafiaGomezS.R.L">
                <img src="/Imagenes/facebook.png" alt="Facebook" className="social-logo" />
            </a>
            </li>
            <li>
            <a href="https://wa.me/5492915372399">
                <img src="/Imagenes/whatsapp.png" alt="WhatsApp" className="social-logo" />
            </a>
            </li>
            <li>
            <a href="https://maps.app.goo.gl/gC7RhUJZCJnDxdgi8">
                <img src="/Imagenes/maps.png" alt="Google Maps" className="social-logo" />
            </a>
            </li>
        </ul>
        </div>
    </div>
    <div className="menu-footer-section">
        <div className="footer-creds">
        <p>©Copyright 2024 - serigrafiagomez.com.ar - Todos los derechos reservados.</p>
        </div>
    </div>
    </footer>
);
}

export default Footer;