const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Para manejar solicitudes desde otro dominio (React)
const db = require('./db'); // Importa la conexión de la base de datos
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Buscar usuario en la base de datos
    db.query('SELECT * FROM USUARIO WHERE EMAIL = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        const user = results[0];

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.PASSWORD); // Asegúrate de que este campo es correcto

        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.ID_USUARIO, role: user.ROLE }, 'secreto', { expiresIn: '1h' });

        res.json({ token, role: user.ROLE });
    });
});

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { nombre, email, password, role } = req.body;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    db.query('INSERT INTO USUARIO (NOMBRE, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?)', [nombre, email, hashedPassword, role], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar el usuario' });
        }

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
});

// Ruta para crear un nuevo cliente
app.post('/clientes', (req, res) => {
    const { nombre, telefono, email } = req.body;

    db.query('INSERT INTO CLIENTE (NOMBRE, TELEFONO, EMAIL) VALUES (?, ?, ?)', [nombre, telefono, email], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el cliente' });
        }

        res.status(201).json({ message: 'Cliente creado con éxito' });
    });
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM CLIENTE', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los clientes' });
        }

        res.json(results);
    });
});

// Ruta para crear un nuevo pedido
app.post('/pedidos', (req, res) => {
    const { fecha_ingreso, seña, fecha_fin, importe_total, facturado, tiempo_realizacion, tomado_por, a_realizar_por, ingreso_por, metodo_pago, id_cliente, estado } = req.body;

    db.query('INSERT INTO PEDIDO (FECHA_INGRESO, SEÑA, FECHA_FIN, IMPORTE_TOTAL, FACTURADO, TIEMPO_REALIZACION, TOMADO_POR, A_REALIZAR_POR, INGRESO_POR, METODO_PAGO, ID_CLIENTE, ESTADO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [fecha_ingreso, seña, fecha_fin, importe_total, facturado, tiempo_realizacion, tomado_por, a_realizar_por, ingreso_por, metodo_pago, id_cliente, estado], 
        (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al crear el pedido' });
            }

            res.status(201).json({ message: 'Pedido creado con éxito' });
        }
    );
});

// NUEVA Ruta para obtener todos los pedidos
app.get('/pedidos', (req, res) => {
    db.query('SELECT * FROM PEDIDO', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los pedidos' });
        }

        res.json(results);
    });
});

// Iniciar el servidor
app.listen(5000, () => {
    console.log('Servidor corriendo en http://localhost:5000');
});
