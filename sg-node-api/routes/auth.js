const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../routes/db');      //IMporto la conexion a la base de db.js.
const bcryptjs = require('bcryptjs');



router.post('/register', async (req, res) => {    //endpoint para registrar nuevos usuarios.
    const { nombre, email, password, rol } = req.body;
    
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);//hasheo la contraseña (se cifra)

        const query = 'INSERT INTO USUARIO (NOMBRE, EMAIL, PASSWORD, ROL) VALUES (?, ?, ?, ?)';//inserta al usuario en la db

    db.query(query, [nombre, email, hashedPassword, rol], (err, _result) => {
        if (err) {//ciclo if para que me diga si se cro o no el user
        return res.status(500).json({ message: 'Error al crear el usuario', error: err });
        }// Fin del IF
        res.status(201).json({ message: 'Usuario creado con éxito' });
    });
    } catch (err) {
    res.status(500).json({ message: 'Error al cifrar la contraseña', error: err });
    }
});

module.exports = router;