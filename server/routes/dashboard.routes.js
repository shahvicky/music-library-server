const express =   require('express');
const dashboardCtrl =   require('../controllers/dashboard.controller');
const passport =   require('passport');
const router = express.Router();
require('./../middleware/passport')(passport)

/** GET /api/dashboard/tracks - Get all tracks for a user */
router.route('/tracks')
  .get(passport.authenticate('jwt', {session:false}), dashboardCtrl.getTracks);

module.exports = router;