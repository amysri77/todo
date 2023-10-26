const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth.js');



const taskController = {
  
  createTask: async (req, res) => {

    try {
     const token = jwt.createTask({ userId }, 'your-secret-key', { expiresIn: '10s' }); //jwt generate
      const { taskName,taskDescription,userId } = req.body;
      const task = new Task({ taskName, taskDescription, userId });
      const savedTask = await task.save();
      res.status(201).json({ message: 'task created successfully.' });
      } catch (error) {
      res.status(500).json({ message: 'error' });
    }
    
  },

  listTasks: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const tasks = await Task.find().skip(skip).limit(limit);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  

  updateTask: async (req, res) => {
    try {
     const _id = req.params.id;
      const updatedData = req.body;
      const updatedTask = await Task.findOneAndUpdate(_id, updatedData, { new: true });
      console.log("dfghj")
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      res.status(200).json(updatedTask);console.log("dfghjk");
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const _id = req.params.id;
      const deletedTask = await Task.findOneAndDelete(_id);
      console.log("delete");
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(204).send(); console.log("delete");
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getTask: async (req, res) => {
    try {
      const _id = req.params.id;
      
      const task = await Task.findOne(_id);
      //console.log("hello");
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task); console.log('usertask');
    } catch (error) {
      res.status(500).json({ message: ' error' });
    }
  },
};

module.exports = taskController;
