const db = require('./../models');
const to = require('./../../global_functions').to;
const TE = require('./../../global_functions').TE;
const moment = require('moment');
const logger = require('./../../config/winston');


const createUser = async (body) => {
  let User = db.users;
  let err, transaction;
  //creating transaction as it may be required to call other services like to send a signup email before creating a user
  [err,transaction] = await to(db.sequelize.transaction());
  if(err) {
      TE("Could not register, transaction failed", true)
  } 
  let userObj = createUserObj(body);
  [err,user] = await to(User.create(userObj, {transaction}));
  if(err) {
      transaction.rollback();
      logger.debug(err);
      return TE("Could not create user record", true);
  }
  await transaction.commit();
  return user;
}

/**
 * Helper function to create user object from req body to save to the user table
 * @param {object} body The request body
 * @returns {user} The user object that will be stored in the user table
 */
const createUserObj = (body) => {
  let userObj = {};
  userObj.usrFname = body.fname;
  userObj.usrLname = body.lname;
  userObj.usrEmail = body.email;
  userObj.usrPassHash = body.password;
  // adding a user password expiry date to ask them to change it (not implemented at present)
  userObj.usrPassExpiry = moment.utc().add(3,'months');
  // check number of incorrect attempts to lock the account temporarily 
  userObj.usrPassAttempts = 0;
  // if the user deactivates the account, this flag is 0 else 1
  userObj.usrRowActiveFlag = 1;
  return userObj;
}

/**
 * This function takes user information from the request as parameter, checks if the user email exists in 
 * the database, and then verifies the password.
 * @param {object} userInfo The user info as received in the request
 * @returns {user} Returns the user record from the database if the input parameter matches else throws error 
 */
const authUser =  async (userInfo) => {
  let User = db.users;
  let unique_key = userInfo.email;
  if(!unique_key) TE('Please enter an email to login');
  if(!userInfo.password) TE('Please enter a password to login');
  let err, user;
  [err, user] = await to(User.findOne({where:{usrEmail:unique_key}}));
  if(err) TE(err.message);
  if(!user) TE('Not registered');
  [err, user] = await to(user.comparePassword(userInfo.password));
  if(err) TE(err.message);
  if(!user.usrRowActiveFlag) TE('User account deleted')
  return user;
}


module.exports = {createUser, authUser}