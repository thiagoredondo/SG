import React from 'react';
import '../css/servicios.css';

function Servicios() {
    return (
        <section className="body-hero-section" style={{ backgroundImage: `url(/Imagenes/IMG-20220824-WA0016.jpg)` }}>
            <section className="pic-hero-section">
            <div className="wrap-hero-section">
                    <h1>Nuestros servicios</h1>
                    <p>En Serigrafía Gómez, ofrecemos una amplia gama de servicios para satisfacer las diversas necesidades de nuestros clientes.</p>
                    <p>Realizamos grabados láser en vidrio y metal, brindando un acabado elegante y duradero.</p>
                    <p>También nos especializamos en estampados en diferentes tipos de superficies y prendas, asegurando impresiones de alta calidad que destacan.</p>
                    <p>Además, producimos gigantografías en alta definición, ideales para publicidad a gran escala, y calcomanías troqueladas que se adaptan a cualquier forma y tamaño.</p>
                    <p>Nuestra oferta incluye cartelería y autoadhesivos personalizados, perfectos para destacar su marca en cualquier lugar.</p>
                    <p>Estamos comprometidos en entregar productos que superen las expectativas, siempre con la calidad que nos caracteriza.</p>
                </div>
                <div className="wrap-pic-hero-section">
                    
                    <ul>
                        <li><img src="/Imagenes/trabajo1.jpg" className="work-img" alt="Grabado láser sobre metal" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo2.jpg" className="work-img" alt="Estampados sobre prendas e indumentaria" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo3.jpg" className="work-img" alt="Grabado láser sobre vidrio" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo4.jpg" className="work-img" alt="Estampados sobre prendas e indumentaria" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo5.jpg" className="work-img" alt="Grabado láser sobre cuero" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo6.jpg" className="work-img" alt="Grabado láser sobre metal" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo7.jpg" className="work-img" alt="Estampados sobre remeras" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo8.jpg" className="work-img" alt="Grabado láser sobre vidrio" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo9.jpg" className="work-img" alt="Grabado láser sobre madera" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo10.jpg" className="work-img" alt="Imanes resinados" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo11.jpg" className="work-img" alt="Grabados láser en bicapa" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo12.jpg" className="work-img" alt="Etiquetas autoadhesivas" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo13.jpg" className="work-img" alt="Grabado láser sobre madera" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo14.jpg" className="work-img" alt="Grabado láser sobre vidrio" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo15.jpg" className="work-img" alt="Etiquetas resinadas" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo16.jpg" className="work-img" alt="Grabado láser sobre vidrio" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo17.jpg" className="work-img" alt="Grabado láser sobre cuero" loading="lazy" /></li>
                        <li><img src="/Imagenes/trabajo18.jpg" className="work-img" alt="Grabado láser sobre vidrio y metal" loading="lazy" /></li>
                    </ul>
                </div>
            </section>
        </section>
    );
}

export default Servicios;
