const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Add other necessary fields here
  },{
    timestamps: true
  }
  );

  const Task = mongoose.model('Task', taskSchema);
  module.exports = Task;
