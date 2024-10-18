import React, { useState } from 'react';
import '../styles/style-seguitupedido.css';

const SeguiTuPedido = () => {
    const [email, setEmail] = useState(''); // seteo el estado de email.
    const [password, setPassword] = useState(''); // seteo la contraseña

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Lógica para enviar al backend
            const response = await fetch('http://localhost:5000/login', { // hago la solicitud al server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // envio el email y la contraseña al server
            });

            if (!response.ok) {
                // Si el servidor responde con un error, lanzar el error
                throw new Error('Error en el servidor. Verifique sus datos.');
            }

            const data = await response.json(); // Espero la respuesta en formato JSON

            // Almacenar el token en localStorage
            localStorage.setItem('token', data.token);

            // Redirijo según el rol del usuario
            if (data.role === 'admin') {
                window.location.href = '/userpanel'; // Redirige a UserPanel si es admin
            } else {
                window.location.href = '/clientpanel'; // Redirige a ClientPanel si es público
            }
        } catch (error) {
            // Si hay un error en la solicitud, mostrar el mensaje de error
            alert(error.message || 'Ocurrió un error, intente nuevamente.');
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
                </form>
            </div>
        </section>
    );
};

export default SeguiTuPedido;
