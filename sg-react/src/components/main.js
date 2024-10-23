import React from 'react';
import '../css/index.css';

function Main() {
    return (
        <section className="hero-section" style={{ backgroundImage: `url(/Imagenes/IMG-20220824-WA0016.jpg)` }}>
            <div className="wrap-hero-section">
                <h1>Serigrafía Gómez</h1>
                <p>
                    En Serigrafía Gómez ofrecemos servicios especializados en la impresión de diseños y logotipos en diversos materiales y productos mediante la técnica de serigrafía.
                </p>
                <p>
                    Nos dedicamos a crear ropa, artículos promocionales y otros productos con impresiones de alta calidad, personalizados según las necesidades de nuestros clientes.
                </p>
                <p>
                    Nuestro enfoque principal es brindar soluciones visuales para empresas y particulares que buscan destacar su marca o identidad a través de productos personalizados.
                </p>
                <div className="wrap-cta">
                    <a href="/servicios" className="cta-a">CONÓCENOS</a>
                </div>
            </div>
        </section>
    );
}

export default Main;
