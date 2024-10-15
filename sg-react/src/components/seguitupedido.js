import React, { useState } from 'react';
import '../styles/style-seguitupedido.css';

const SeguiTuPedido = () => {
    const [email, setEmail] = useState(''); // seteo el estado de email.
    const [password, setPassword] = useState(''); // seteo la contraseña

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Lógica para enviar al backend
        const response = await fetch('http://localhost:5000/login', { // hago la solicitud al server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // envio el email y la contraseña a la bd
        });

        const data = await response.json(); // espero al server

        if (response.ok) { // redirijo según el rol
            if (data.role === 'admin') {
                window.location.href = '/userpanel'; // Redirige a UserPanel si es admin
            } else {
                window.location.href = '/clientpanel'; // Redirige a ClientPanel si es público
            }
        } else {
            alert(data.message); // mostrar mensaje de error
        }
    };

    return (
        <section className="hero-section-stp">
            <div className="contact-container-stp">
                <form onSubmit={handleSubmit} className="contact-left-stp">
                    <div className="contact-left-title-stp">
                        <h2>Ingresa</h2>
                        <hr />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="contact-inputs-stp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="contact-inputs-stp"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="link-button-stp">
                        Ingresar <img src="/Imagenes/arrow_icon.png" alt="" />
                    </button>
                    <button type="button" className="link-button-forgot-stp">
                        ¿Olvidaste tu contraseña?
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SeguiTuPedido;
