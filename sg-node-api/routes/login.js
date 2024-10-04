const express = require('express');
const bcrypt = require('bcryptjs');  // Para comparar contraseñas
const db = require('../db');      // Conexión a la base de datos
const bcryptjs = require('bcryptjs');
const router = express.Router();

router.post('/login', (req, res) => {   // defino endpoint a la propiedad router.post(/ lo que deba hacer)
    const { email, password } = req.body;
    
    if (!email || !password) {// se validan en email y la contraseña
        return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }
    const query = 'SELECT * FROM USUARIO WHERE EMAIL = ?';  //busco el email en la bd
    db.query(query, [email], async (err, results) => {
        if (err) 
            return res.status(500).json({ message: 'Error al acceder a la base de datos' });
        if (results.length === 0) {                  // verifico que el usuario exista
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const user = results[0];// El usuario encontrado
        const isMatch = await bcryptjs.compare(password, user.PASSWORD);//Comparo la contraseña ingresada con la contraseña cifrada en bd
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        //Verifico el rol del usuario(admin)
        if (user.ROL === 'administrador') {
            return res.status(200).json({ message: 'Acceso concedido', role: 'admin', redirectUrl: '/admin' });
        } else {
            return res.status(200).json({ message: 'Acceso concedido', role: 'user', redirectUrl: '/dashboard' });
        }
    });
});

module.exports = router;