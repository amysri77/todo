const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const config = require('../config/email');
const User = require('../models/User');

const transporter = nodemailer.createTransport(config.email);

const userController = {
  // User registration
  register: async (req, res) => {
    try {
      const { username, email, password, mobile } = req.body;
      console.log("qwert")
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      console.log("qwert")

      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use.' });
      }
      console.log("qwert")

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("qwert")

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        mobile,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  // User login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the email exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Generate a JWT token for user session management
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '100s', // Token expires in 100sec (adjust as needed)
      });

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // User logout (This route can be used to revoke tokens, if necessary)
  logout: (req, res) => {
    // Implement token revocation logic, if needed
    res.status(200).json({ message: 'Logout successful' });
  },
  requestPasswordReset: (req, res) => {
    const { email } = req.body;
    console.log("asdf");
    // Generate a unique reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set an expiration time for the token (e.g., 1 hour)
    const resetTokenExpiration = Date.now() + 3600000;

    // Update the user's record with the reset token and expiration
    User.findOneAndUpdate(
      { email },
      {
        resetToken,
        resetTokenExpiration,
      },
      { new: true },
      (err, user) => {
        if (err || !user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Send a password reset email with the reset token
        const resetLink = `${req.protocol}://${req.get('host')}/user/reset-password/${resetToken}`;
        const mailOptions = {
          from: config.email.auth.user,
          to: email,
          subject: 'Password Reset',
          text: `To reset your password, click the following link: ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).json({ message: 'Email not sent' });
          }
          res.status(200).json({ message: 'Password reset email sent' });
        });
      }
    );
  },

  // Reset password using the token
  resetPassword: (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update the user's password
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        user.save((err) => {
          if (err) {
            return res.status(500).json({ message: 'Password reset failed' });
          }
          res.status(200).json({ message: 'Password reset successful' });
        });
      });
  },
};

module.exports = userController;
