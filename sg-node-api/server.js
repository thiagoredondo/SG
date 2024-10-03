const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const tasksRoutes = require('./routes/tasks'); // importo las rutas de tasks

const app = express();
const port = 5000; 

//Middleware
app.use(cors());
app.use(express.json());  // Para recibir y enviar datos en formato JSON
app.use('/tasks', tasksRoutes); // importo las rutas de tasks

const db = mysql.createConnection({   //Conexion a mi base de datos.(parametros)
    host: '127.0.0.1',
    user: 'admin',
    password: 'Tuberculo9*',
    database: 'SerigrafiaG'
});

db.connect(err => {// Conexion a mi base de datos.
    if (err){
        console.error('Error de conexion a MySQL in Azure: ',err);
        return;
    }
    console.log('Conectando a MySQL en Azure...');
});

app.get('/',(_req, res)=>{  //Defino la ruta de la API
    res.send('API Funcionando con normalidad!');
});

app.listen(port,() =>{   // el servidor escucha = esta conectado en..
    console.log('Servidor escuchando en http://localhost:${port}')
});

