// emailTemplates.js

const yourEmail = () => {
    return `
      <p>Thank you for registering!</p>
      <p>Your account is now active.</p>
    `;
  };
  
  const taskEmail = (taskTitle) => {
    return `
      <p>A new task has been created:</p>
      <p>Task Title: ${taskTitle}</p>
    `;
  };
  
  module.exports = { yourEmail, taskEmail };
  