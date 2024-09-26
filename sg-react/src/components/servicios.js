import React from 'react';
import '../styles/style-servicios.css';

function Servicios() {
    return (
        <section className="body-hero-section">
            <section className="hero-section">
                <div className="wrap-hero-section">
                    <h1>Nuestros servicios</h1>
                    <p>En Serigrafía Gómez, ofrecemos una amplia gama de servicios para satisfacer las diversas necesidades de nuestros clientes.</p>
                    <p>Realizamos grabados láser en vidrio y metal, brindando un acabado elegante y duradero.</p>
                    <p>También nos especializamos en estampados en diferentes tipos de superficies y prendas, asegurando impresiones de alta calidad que destacan.</p>
                    <p>Además, producimos gigantografías en alta definición, ideales para publicidad a gran escala, y calcomanías troqueladas que se adaptan a cualquier forma y tamaño.</p>
                    <p>Nuestra oferta incluye cartelería y autoadhesivos personalizados, perfectos para destacar su marca en cualquier lugar.</p>
                    <p>Estamos comprometidos en entregar productos que superen las expectativas, siempre con la calidad que nos caracteriza.</p>
                </div>
            </section>
            <section className="pic-hero-section">
                <div className="wrap-pic-hero-section">
                    <ul>
                        <li><img src="/Imagenes/trabajo2.jpg" className="work-img" alt="" /></li>
                        <li><img src="/Imagenes/trabajo3.jpg" className="work-img" alt="" /></li>
                        <li><img src="/Imagenes/trabajo4.jpg" className="work-img" alt="" /></li>
                        <li><img src="/Imagenes/trabajo5.jpg" className="work-img" alt="" /></li>
                        <li><img src="/Imagenes/trabajo6.jpg" className="work-img" alt="" /></li>
                        <li><img src="/Imagenes/trabajo7.jpg" className="work-img" alt="" /></li>
                        <li><img src="/Imagenes/trabajo8.jpg" className="work-img" alt="" /></li>
                    </ul>
                </div>
            </section>
        </section>
    );
}

export default Servicios;