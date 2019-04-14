const to = require('./../../global_functions').to;
const ReS = require('./../../global_functions').ReS
const ReE = require('./../../global_functions').ReE;
const db = require('./../models');
const logger = require('./../../config/winston');

const getTracks = async (req, res) => {
  let user = req.user;
  let err, tracks;
  [err, tracks] = await to(db.tracks.findAll({
    where: {
      trkUserId: user.usrUserId
    }
  }));
  if(err) {
    return ReE(res, {message: 'Error in getting tracks'});
  }
  if(!tracks) {
    return ReS(res);
  }
  return ReS(res, {data: tracks}, 200);
}

module.exports = {getTracks}