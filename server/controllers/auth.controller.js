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
  if(body.password !== body.passwordConfirm) {
    return ReE(res, {message: "Password does not match with confirm password"}, 422);
  }
 [err, user] = await to(authService.createUser(body));
  if(err) return ReE(res, err, 422);
  return ReS(res, {message:"Successfully registered."}, 201);
}

/**
 * This function is used for user login. 
 * @param {any} req
 * @param {any} res
 * @returns {*} Returns jwt token, email if valid username(email) and password is provided
 */
const login = async function(req, res){
  const body = req.body;
  let err, user;

  [err, user] = await to(authService.authUser(body));
  if(err) return ReE(res, err, 422);
  const userObj = user.toWeb();
  return ReS(res, {token:user.getJWT(), email: userObj.usrEmail});
}


module.exports = {create, login}