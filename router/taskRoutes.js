const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const checkAuth = require('../middleware/auth');

// Get task details
router.get('/gettask', taskController.getTask);

// Create a new task
router.post('/createtask', taskController.createTask);

// List tasks with pagination
router.get('/listtask', taskController.listTasks);


// Update a task
router.put('/updatetask', taskController.updateTask);

// Delete a task
router.delete('/deletetask', taskController.deleteTask);

module.exports = router;