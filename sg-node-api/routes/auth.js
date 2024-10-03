// endpoint de la api para generar user nuevos, etc
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/register', async (req, res) => {   //crear a usuario...
    const { nombre, email, password, rol } = req.body;
    try {

const hashedPassword = await bcrypt.hash(password, 10);    //hasheo la contraseña (se cifra)

const query = 'INSERT INTO USUARIO (NOMBRE, EMAIL, PASSWORD, ROL) VALUES (?, ?, ?, ?)';   //inserta al usuario en la base
db.query(query, [nombre, email, hashedPassword, rol], (err, result) => {
        if (err) {   //ciclo if para que me diga si se cro o no el user
        return res.status(500).json({ message: 'Error al crear el usuario', error: err });
        }
        res.status(201).json({ message: 'Usuario creado con éxito' });
    });   // Fin del IF
    } catch (err) {
    res.status(500).json({ message: 'Error al cifrar la contraseña', error: err });
    }
});

module.exports = router;