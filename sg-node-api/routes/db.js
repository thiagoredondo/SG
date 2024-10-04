const mysql = require('mysql2');

const db = mysql.createConnection({   //Conexion a mi base de datos.(parametros)
    host: '127.0.0.1',
    user: 'admin',
    password: 'Tuberculo9*',
    database: 'SerigrafiaG'
});
db.connect(err => {                // Conexion a mi base de datos.
    if (err){
        console.error('Error de conexion a MySQL in Azure: ',err);
        return;
    }
    console.log('Conectando a MySQL en Azure...');
});

module.exports = db;