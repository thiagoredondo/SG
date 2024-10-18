const mysql = require('mysql2');

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost', // Cambia esto si tu base de datos está en otro lugar
    user: 'thiago', // Reemplaza con tu usuario de MySQL
    password: '123456', // Reemplaza con tu contraseña de MySQL
    database: 'SistemaPedidos', // Nombre de tu base de datos
    port: 3306 // O el puerto que estés utilizando
});

// Conecta a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida con éxito.');
});

module.exports = connection; // Exporta la conexión para usarla en otros archivos
