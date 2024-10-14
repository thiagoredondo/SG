import React, {useState} from 'react';
import '../styles/style-seguitupedido.css';

const SeguiTuPedido = () => {
    const[email, setEmail]=useState(''); //seteo el estado de email.
    const[password, setPassword]=useState(''); //seteo la contraseña
    const handleSubmit=async(e)=>{
        e.preventDefault();

        const response=await fetch('http://localhost:5000/login',{ //hago la solicitud al server
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({email, password}),//envio el email y la contraseña a la bd
        });
        const data=await response.json();//espero al server
        
        if(response.ok){ //redirijo segun rol
            if(data.role==='admin'){
                window.location.href=data.redirectUrl;//users
            }else{
                window.location.href=data.redirectUrl;//publico
            }
        }else{
            alert(data.message);//mostrar mensaje de err
        }
    }
return (
    <section className="hero-section-stp">
    <div className="contact-container-stp">
        <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="contact-left-stp"
        >
        <div className="contact-left-title-stp">
            <h2>Ingresa</h2>
            <hr />
        </div>
        <input
            type="hidden"
            name="access_key"
            value="b7728d75-305e-4796-ba4d-17ee9ff23e4b"
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
            className="contact-inputs-stp"
            required
        />
        <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="contact-inputs-stp"
            required
        />
        <button type="submit" className="link-button-stp">
            Ingresar <img src="/Imagenes/arrow_icon.png" alt="" />
        </button>
        <button type="button" className="link-button-forgot-stp">¿Olvidaste tu contraseña?</button>
        </form>
    </div>
    </section>
);
};

export default SeguiTuPedido;