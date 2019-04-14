const express =   require('express');
const validate =   require('express-validation');
const paramValidation =   require('../../config/param-validation');
const addmusicCtrl =   require('../controllers/addmusic.controller');
const passport =   require('passport');
const router = express.Router();
require('./../middleware/passport')(passport)

/** GET /api/addmusic/search - Search for music */
router.route('/search/:searchKey')
  .get(passport.authenticate('jwt', {session:false}), addmusicCtrl.search);

/** GET /api/addmusic/addToLib - add track to user library */
router.route('/addToLib')
  .get(passport.authenticate('jwt', {session:false}), addmusicCtrl.create);

module.exports = router;