const Joi = require('joi');

module.exports = {
  
  registerUser: {
    body: {
      fname: Joi.string().max(60).required(),
      lname: Joi.string().max(60).required(),
      email: Joi.string().email().required(),
      // password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{6,}$/).required(),
      //password should have: 1 upper case, 1 lower case, minimum 6 length 
      password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{6,}$/).required(),   
    }
  },

  loginUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
};
