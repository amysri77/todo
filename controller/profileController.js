const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const profileController = {
  getProfile: async (req, res) => {
    try {
      const userId = req.user_id; 
      console.log("asdf");

      const user = await User.findOne({ id: userId });

      console.log("qwee");

      if (!user) {
        console.log("asdf");
        return res.status(404).json({ message: 'User not found' });
      }
     
      return res.status(200).json({ message: user });

      } catch (error) {
      console.error(error);
      res.status(500).json({ message:error });
    }
  },



  
  uploadProfilePicture: (req, res) => {
  const image = req.body;
   if (!image) {  
      return res.status(300).json({ message: 'No image uploaded.' });
    }
      res.status(200).json({ message: 'Profile picture uploaded successfully' }); 
  },

};

module.exports = profileController;

