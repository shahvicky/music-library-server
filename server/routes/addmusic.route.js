const express =   require('express');
const validate =   require('express-validation');
const paramValidation =   require('../../config/param-validation');
const addmusicCtrl =   require('../controllers/addmusic.controller');
const passport =   require('passport');
const router = express.Router();
require('./../middleware/passport')(passport)

/**
 * 
 * @api {GET} /api/addmusic/search Search Music
 * @apiName Search a music from last.fm service
 * @apiGroup AddMusic
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} searckKey The keyword to search the track, album, artist
 * 
 * @apiSuccess (200) {boolean} success Boolean to inform if the API was success or errored
 * @apiSuccess (200) {json} data tracks result as got from the last.fm api
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     success : true,
 *     data: {tracks: { ... }}
 * }
 * 
 * 
 */
router.route('/search/:searchKey')
  .get(passport.authenticate('jwt', {session:false}), addmusicCtrl.search);

/**
 * 
 * @api {GET} /api/addmusic/addToLib Add music to user library
 * @apiName Add Music to user library
 * @apiGroup AddMusic
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} trackId The mbid of the track as required by the last.fm api to get track details
 * 
 * @apiSuccess (200) {boolean} success Boolean to inform if the API was success or errored
 * @apiSuccess (200) {String} message The info whether a track is added or not
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     trackId : 060e38a6-9ad9-44d3-abc1-741a0bf633ca
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success : true,
 *     message: "Track added to user library"
 * }
 * 
 */
router.route('/addToLib/:trackId')
  .get(passport.authenticate('jwt', {session:false}), addmusicCtrl.create);

module.exports = router;