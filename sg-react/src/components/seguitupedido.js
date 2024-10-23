import React, { useState } from 'react';
import '../css/seguimiento-pedido.css';

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
                window.location.href = data.role === 'admin' ? '/userpanel' : '/clientpanel';
            } else {
                throw new Error('No se recibió un token válido.');
            }
        } catch (error) {
            alert(error.message || 'Ocurrió un error, intente nuevamente.');
        }
    };

    return (
        <section className="hero-section" style={{ backgroundImage: `url(/Imagenes/IMG-20220824-WA0016.jpg)` }}>
            <div className="contact-container">
                <form onSubmit={handleSubmit} className="contact-left">
                    <div className="contact-left-title">
                        <h2>Ingresa</h2>
                        <hr />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="contact-inputs"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="contact-inputs"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="link-button">
                        Ingresar <img src="/Imagenes/arrow_icon.png" alt="Icono de flecha" />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SeguiTuPedido;
