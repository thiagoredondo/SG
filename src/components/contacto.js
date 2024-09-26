import React from 'react';
import '../styles/style-contacto.css';

function Contacto() {
    return (
        <section className="main">
            <div className="container">
                <form action="https://api.web3forms.com/submit" method="POST" className="left">
                    <div className="left-title">
                        <h2>Contactate con nosotros</h2>
                        <hr />
                    </div>
                    <input type="hidden" name="access_key" value="b7728d75-305e-4796-ba4d-17ee9ff23e4b" />
                    <input type="text" name="name" placeholder="Tu nombre" className="inputs" required />
                    <input type="email" name="email" placeholder="Tu email" className="inputs" required />
                    <textarea name="message" placeholder="Escribe tu consulta" className="textarea" required></textarea>
                    <button type="submit">Enviar <img src="/Imagenes/arrow_icon.png" alt="" /></button>
                </form>
                <div className="right">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.947487612948!2d-62.259876199999994!3d-38.7190146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95eda34cf73cd3b7%3A0x725b91f33304c976!2sSERIGRAFIA%20GOMEZ!5e0!3m2!1ses-419!2sar!4v1724442381448!5m2!1ses-419!2sar" 
                        className="serigrafia-map" 
                        title="Ubicación de Serigrafía Gomez"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}

export default Contacto;
