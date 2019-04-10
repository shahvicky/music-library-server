const express = require('express');
const ReS = require('./../../global_functions').ReS;
const authRoutes = require('./auth.route');
const router = express.Router();

/**
 * @api {GET} /api/health-check Server Monitoring
 * @apiName Health Check API for monitoring
 * @apiGroup Index
 * @apiVersion  1.0.0
 * 
 * @apiSuccess (200) {boolean} success Boolean to inform if the API was success or errored
 * @apiSuccess (200) {String} message OK if the server is running and is connected to the databases
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     success : true,
 *     message : 'OK'
 * }
 * 
 */

router.get('/health-check', async (req, res) => {
  await setTimeout(() => {
    return ReS(res, {message:"OK"});
  }, 3000);
  
});

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
