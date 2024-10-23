import React from 'react';
import '../css/nosotros.css';

const Nosotros = () => {
    return (
        <section className="hero-section" style={{ backgroundImage: `url(/Imagenes/IMG-20220824-WA0016.jpg)` }}>
            <div className="wrap-hero-section">
                <h1>Nuestra historia</h1>
                <p>
                    En Serigrafía Gómez, comenzamos nuestra historia a fines de la década de los 60’ en Bahía Blanca, con la visión de ofrecer productos impresos de alta calidad y una amplia variedad de servicios gráficos.
                </p>
                <p>
                    Lo que empezó como un pequeño taller, con el tiempo se ha convertido en una empresa consolidada en el rubro de la serigrafía en el sur de la provincia de Buenos Aires.
                </p>
                <p>
                    Desde nuestros inicios, hemos mantenido el compromiso de brindar un servicio personalizado y de excelencia, siempre adaptándonos a las necesidades de nuestros clientes.
                </p>
                <p>
                    Hoy, seguimos siendo una empresa familiar, orgullosos de nuestra trayectoria y dedicados a seguir creciendo junto a nuestros clientes.
                </p>
            </div>
        </section>
    );
};

export default Nosotros;
