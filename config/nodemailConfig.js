const nodemailer = require('nodemailer');

// Define your email transport options (e.g., for Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sridol1210@gmail.com',
    pass: 'Jobmca0987@',
  },
});

module.exports = transporter;
