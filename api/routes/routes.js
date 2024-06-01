const router =require("express").Router();
const Task = require('../Model/model.js');

router.post('/tasks', async (req, res) => {
    const task = new Task({
        task: req.body.task
    });

    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/tasks/:id', async (req, res) => {
    console.log('inside the backend', req.params.id);
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.task = req.body.task;
            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found in the backend' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/tasks/:id', async (req, res) => {
    console.log('Deleting task with ID:', req.params.id);
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (deletedTask) {
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;

