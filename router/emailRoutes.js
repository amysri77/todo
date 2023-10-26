// emailRoutes.js

const express = require('express');
const router = express.Router();
const emailService = require('../middleware/emailService'); // Import your email service

// Send a registration confirmation email
router.post('/register', (req, res) => {
  const { email } = req.body;
  emailService.sendRegistrationConfirmation(email);
  res.status(200).json({ message: 'Registration confirmation email sent' });
});

// Send an email when a task is created
router.post('/task-created', (req, res) => {
  const { email, taskTitle } = req.body;
  emailService.sendTaskCreatedNotification(email, taskTitle);
  res.status(200).json({ message: 'Task created email sent' });
});

module.exports = router;
