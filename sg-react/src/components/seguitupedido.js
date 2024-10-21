import React, { useState } from 'react';
import '../styles/style-seguitupedido.css';

const SeguiTuPedido = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el servidor. Verifique sus datos.');
            }

            const data = await response.json();
            
            if (data.token) {
                localStorage.setItem('token', data.token);
            } else {
                throw new Error('No se recibió un token válido.');
            }

            if (data.role === 'admin') {
                window.location.href = '/userpanel';
            } else {
                window.location.href = '/clientpanel';
            }
        } catch (error) {
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
                        Ingresar <img src="/Imagenes/arrow_icon.png" alt="Icono de flecha" />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SeguiTuPedido;
