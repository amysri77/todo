const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// User logout 
router.post('/logout', userController.logout);

// Request password reset
router.post('/reset-password', userController.requestPasswordReset);

// Reset password using the token
router.put('/reset-password/:token', userController.resetPassword);

module.exports = router;
