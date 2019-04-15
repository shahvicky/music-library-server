const express =   require('express');
const validate =   require('express-validation');
const paramValidation =   require('../../config/param-validation');
const authCtrl =   require('../controllers/auth.controller');
const passport =   require('passport');
const router = express.Router();
require('./../middleware/passport')(passport)

/**
 * 
 * @api {POST} /api/auth/register User Registration
 * @apiName Register User
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} email User email to register
 * @apiParam  {String} fname User first name
 * @apiParam  {String} lname User last name
 * @apiParam  {String} password User password
 * @apiParam  {String} passwordConfirm Password confirmation
 * 
 * @apiSuccess (201) {boolean} success Boolean to inform if the API was success or errored
 * @apiSuccess (201) {String} message Registraction message
 * 
 * @apiParamExample  {Object} Request-Example:
 * {
 *     email: "shahvicky1992@gmail.com",
 *     fname: "Vivek",
 *     lname: "Shah",
 *     password: "*****",
 *     passwordConfirm: "*****"
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     "message":"Successfully registered.",
 *     "success":true
 * }
 * 
 * 
 */
router.route('/register')
  .post(validate(paramValidation.registerUser), authCtrl.create);

/**
 * @api {post} /api/auth/login Logs in a user and returns token if correct email and password is provided
 * @apiName login
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam (Request Body)  {String} email The user emailid
 * @apiParam (Request Body)  {String} password The user password
 * 
 * @apiSuccess (200) {boolean} success Boolean to inform if the API was success or errored
 * @apiSuccess (200) {String} token The jwt token generated by the 
 * 
 * @apiParamExample  {js} Request-Example:
 * body : {
 *  "email" : "shahvicky1992@gmail.com",
 *  "password": "*********"
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *  success: true,
 *  token:jwt token
 * }
 */

router.route('/login')
  .post(validate(paramValidation.loginUser), authCtrl.login);

module.exports = router;