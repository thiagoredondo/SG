const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Asegúrate de que la ruta sea correcta
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
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos' });
    }

    try {
        connection.query('SELECT * FROM usuario WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return handleError(res, err, 'Error durante la consulta de login');
            }

            console.log(results); // Agrega esto para depurar

            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const user = results[0];

            // Asegurarse de que la contraseña sea undefined
            if (typeof user.password === 'undefined') {
                return res.status(400).json({ message: 'Contraseña no encontrada' });
            }

            // Comparar la contraseña
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ id: user.idUsuario, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, role: user.role }); // Cambiado de ROLE a role
        });
    } catch (error) {
        return handleError(res, error, 'Error en el servidor durante el login');
    }
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    connection.query('SELECT idUsuario, nombre FROM Usuario', (err, results) => {
        if (err) return handleError(res, err, 'Error al obtener usuarios');

        res.json(results);
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
        connection.query('INSERT INTO USUARIO (nombre, email, password, role) VALUES (?, ?, ?, ?)', 
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

    if (!fechaIngreso || !importeTotal || !idCliente || !descripcion || !cantidad || !categoria || !tomadoPor) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos del pedido.' });
    }

    connection.query('INSERT INTO PEDIDO (fechaIngreso, senia, fechaFin, importeTotal, facturado, tomadoPor, aRealizarPor, ingresoPor, metodoPago, idCliente, estado, descripcion, cantidad, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [fechaIngreso, senia, fechaFin, importeTotal, facturado, tomadoPor, aRealizarPor, ingresoPor, metodoPago, idCliente, estado, descripcion, cantidad, categoria], 
        (err) => {
            if (err) return handleError(res, err, 'Error al agregar el pedido');

            res.status(201).json({ message: 'Pedido agregado con éxito' });
        }
    );
});

// Ruta para obtener pedidos
app.get('/pedidos', (req, res) => {
    const query = `
        SELECT 
            p.idPedido,
            p.fechaIngreso,
            p.senia,
            p.fechaFin,
            p.importeTotal,
            p.facturado,
            u1.nombre AS tomadoPor,
            u2.nombre AS aRealizarPor,
            p.ingresoPor,
            p.metodoPago,
            p.idCliente,
            p.estado,
            p.descripcion,
            p.cantidad,
            p.categoria
        FROM 
            Pedido p
        INNER JOIN 
            Usuario u1 ON p.tomadoPor = u1.idUsuario
        INNER JOIN 
            Usuario u2 ON p.aRealizarPor = u2.idUsuario
    `;
    
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener pedidos' });
        }
        res.json(results);
    });
});

// Ruta para eliminar un pedido
app.delete('/eliminar-pedido/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM PEDIDO WHERE idPedido = ?', [id], (err, results) => {
        if (err) return handleError(res, err, 'Error al eliminar el pedido');

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json({ message: 'Pedido eliminado con éxito' });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
