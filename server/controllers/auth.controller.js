const to = require('./../../global_functions').to;
const ReS = require('./../../global_functions').ReS;
const ReE = require('./../../global_functions').ReE;
const authService = require('./../services/AuthService');

/**
 * Creates a user.
 * @param req
 * @param res
 * @returns {*}
 */
const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;
  let err, user;
  
 [err, user] = await to(authService.createUser(body));
  if(err) return ReE(res, err, 422);
  return ReS(res, {message:"Successfully registered."}, 201);
}

module.exports = {create}