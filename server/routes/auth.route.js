const express =   require('express');
const validate =   require('express-validation');
const paramValidation =   require('../../config/param-validation');
const authCtrl =   require('../controllers/auth.controller');
const passport =   require('passport');
const router = express.Router();
require('./../middleware/passport')(passport)

/** POST /api/auth/register - Create new user */
router.route('/register')
  .post(validate(paramValidation.registerUser), authCtrl.create);

router.route('/login')
  .post(validate(paramValidation.loginUser), authCtrl.login);

module.exports = router;