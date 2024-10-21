const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'thiago',
    password: '123456',
    database: 'SerigrafiaGomez'
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectarse a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Función de manejo de errores
const handleError = (res, err, message) => {
    console.error(message, err);  // Agregado para ver el error completo
    return res.status(500).json({ message: 'Error en el servidor. Verifique sus datos.' });
};

// Ruta para login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos' });
    }

    // Consulta del usuario por email
    connection.query('SELECT * FROM USUARIO WHERE EMAIL = ?', [email], async (err, results) => {
        if (err) return handleError(res, err, 'Error en la consulta de la base de datos');

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];

        try {
            // Comparar la contraseña ingresada con la almacenada
            const isMatch = await bcrypt.compare(password, user.PASSWORD);
            console.log('Resultado de comparación de contraseñas:', isMatch);  // Depuración

            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            // Generar el token JWT
            const token = jwt.sign({ id: user.ID_USUARIO, role: user.ROLE }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('Token generado:', token);  // Depuración

            // Responder con el token y el rol del usuario
            res.json({ token, role: user.ROLE });
        } catch (error) {
            console.error('Error durante la comparación de la contraseña:', error);
            return handleError(res, error, 'Error durante la comparación de la contraseña');
        }
    });
});

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { nombre, email, password, role } = req.body;

    if (!nombre || !email || !password || !role) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }

    try {
        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserta el nuevo usuario con la contraseña encriptada
        connection.query('INSERT INTO USUARIO (NOMBRE, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?)', 
            [nombre, email, hashedPassword, role], (err) => {
            if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });

            res.status(201).json({ message: 'Usuario registrado con éxito' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor al encriptar la contraseña' });
    }
});

// Ruta para crear un nuevo cliente
app.post('/clientes', (req, res) => {
    const { nombre, telefono, email } = req.body;

    if (!nombre || !telefono || !email) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos del cliente.' });
    }

    connection.query('INSERT INTO CLIENTE (NOMBRE, TELEFONO, EMAIL) VALUES (?, ?, ?)', [nombre, telefono, email], (err) => {
        if (err) return handleError(res, err, 'Error al crear el cliente');

        res.status(201).json({ message: 'Cliente creado con éxito' });
    });
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    connection.query('SELECT * FROM CLIENTE', (err, results) => {
        if (err) return handleError(res, err, 'Error al obtener los clientes');

        res.json(results);
    });
});

// Ruta para crear un nuevo pedido
app.post('/nuevo-pedido', (req, res) => {
    const { fechaIngreso, senia, fechaFin, importeTotal, facturado, tomadoPor, aRealizarPor, ingresoPor, metodoPago, idCliente, estado, descripcion, cantidad, categoria } = req.body;

    if (!fechaIngreso || !importeTotal || !idCliente || !descripcion || !cantidad || !categoria) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos del pedido.' });
    }

    connection.query('INSERT INTO PEDIDO (FECHA_INGRESO, SENIA, FECHA_FIN, IMPORTE_TOTAL, FACTURADO, TOMADO_POR, A_REALIZAR_POR, INGRESO_POR, METODO_PAGO, ID_CLIENTE, ESTADO, DESCRIPCION, CANTIDAD, CATEGORIA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [fechaIngreso, senia, fechaFin, importeTotal, facturado, tomadoPor, aRealizarPor, ingresoPor, metodoPago, idCliente, estado, descripcion, cantidad, categoria], 
        (err) => {
            if (err) return handleError(res, err, 'Error al agregar el pedido');

            res.status(201).json({ message: 'Pedido agregado con éxito' });
        }
    );
});

// Ruta para obtener todos los pedidos
app.get('/pedidos', (req, res) => {
    connection.query('SELECT * FROM PEDIDO', (err, results) => {
        if (err) return handleError(res, err, 'Error al obtener los pedidos');

        res.json(results);
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
