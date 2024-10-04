const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');    // importo las rutas de tasks
const authRoutes = require('./routes/auth');     //  importo la ruta auth
const loginRoutes = require('./routes/login');  //  importo la ruta login
const db = require('./routes/db');             //importo la ruta db

const app = express();
const port = 5000; 

//Middleware
app.use(cors());
app.use(express.json());// Para recibir y enviar datos en formato JSON

// declaracion de rutas...
app.use('/tasks', tasksRoutes);
app.use('/auth', authRoutes);
app.use('/login', loginRoutes);


db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL en Azure.');
    }
});


app.get('/', (_req, res) => {  // estado de funcionamiento
    res.send('API Funcionando con normalidad!');
});

app.listen(port, () => {  //confirmacion de conexion= escuchar...
    console.log(`Servidor escuchando en http://localhost:${port}`);
});