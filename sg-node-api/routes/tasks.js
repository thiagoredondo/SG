const express = require('express');
const router= express.Router();

router.get('/', (req, res)=>{   //obtiene todas las tareas disponibles ( tasksss)= tareasss
    db.query('SELECT * FROM tasks', (err, results)=>{
        if (err){
            return res.status(500).json({message: err.message});
        }
        res.json(results);
    });
});


router.post('/', (req, res) => {  // creo una nueva tarea/ se puede hacer mas facil y mas simpre./ INVESTIGAR
    const { title, description } = req.body;
    db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, results) => {
    if (err) {
    return res.status(400).json({ message: err.message });
    }
    res.status(201).json({ id: results.insertId, title, description });
    });
});


