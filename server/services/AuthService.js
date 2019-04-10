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
const createUserObj = function (body) {
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
  userObj.usrRowActiveFlag = 0;
  return userObj;
}


module.exports = {createUser}