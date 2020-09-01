const express = require('express')
const router = express.Router()

const Task = require('../models/task');

//Routes
// Recibir todas las tareas
router.get('/', async (req,res) => {
    const tasks = await Task.find();
    res.json(tasks)
})
//Recibir una tarea
router.get('/:id', async (req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
})

//Agregar tarea
router.post('/', async(req,res) => {
    const {title,description} = req.body;
    const task = new Task({title,description})
    await task.save()
    res.json({status: 'Tarea Agregada!'})
})

//Editar tarea
router.put('/:id', async(req,res) => {
    const {title,description} = req.body
    const newTask = {title,description}
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Tarea Actualizada!'})
})

//Borrar Tarea
router.delete('/:id', async(req,res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Tarea Eliminada!'})
})

module.exports = router