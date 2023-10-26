// emailService.js

const transporter = require('../config/nodemailConfig'); // Import the Nodemailer transporter
const { yourEmail, taskEmail } = require('../views/emailTemplates'); // Import email templates 

const emailService = {
  sendRegistrationConfirmation: (recipientEmail) => {
    const mailOptions = {
      from: 'sridol1210@gmail.com',
      to: recipientEmail,
      subject: 'Registration Confirmation',
      html: yourEmail(), // Use a function to generate the email's HTML content
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Registration confirmation email sent:', info.response);
      }
    });
  },

  sendTaskCreatedNotification: (recipientEmail, taskTitle) => {
    const mailOptions = {
      from: 'sridol1210@gmail.com',
      to: recipientEmail,
      subject: 'Task Created',
      html: taskEmail(taskTitle), // Use a function to generate the email's HTML content
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Task created email sent:', info.response);
      }
    });
  },
};

module.exports = emailService;
