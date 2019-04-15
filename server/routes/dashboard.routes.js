const express =   require('express');
const dashboardCtrl =   require('../controllers/dashboard.controller');
const passport =   require('passport');
const router = express.Router();
require('./../middleware/passport')(passport)

/**
 * 
 * @api {GET} /api/dashboard/tracks Dashboard Tracks
 * @apiName Get user tracks on the dashboard
 * @apiGroup dashboard
 * @apiVersion  1.0.0
 * 
 * @apiSuccess (200) {boolean} success Boolean to inform if the API was success or errored
 * @apiSuccess (200) {Array} data The array of tracks to display on dashboard
 * 
 * @apiPermission authenticated user
 * @apiHeader {String} id-token The unique jwt token
 * @apiHeaderExample  {json} Header-Example:
 * { 
 *  "Authorization": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE1NTUzNjUwNTQsImV4cCI6MTU1NTM3NTA1NH0.Wu-6yZiFzizAM5ZzvKvhSWSaD4900LvAOWKgOBKXtbM
 * }
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     data: [{trkTrackId: "060e38a6-9ad9-44d3-abc1-741a0bf633ca", trkUserId: 5, trkTrackName: "Yanar?m",…},…],
 *     success: true
 * }
 */
router.route('/tracks')
  .get(passport.authenticate('jwt', {session:false}), dashboardCtrl.getTracks);

module.exports = router;