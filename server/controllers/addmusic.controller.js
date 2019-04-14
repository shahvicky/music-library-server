const to = require('./../../global_functions').to;
const ReS = require('./../../global_functions').ReS
const ReE = require('./../../global_functions').ReE;
const lastfmService = require('./../services/LastFMService');

const search = async (req, res) => {
  let searchKey = req.params.searchKey;
  let err, tracks;
  [err, tracks] = await to(lastfmService.searchMusic(searchKey));
  if(err) {
    return ReE(res, {message: err});
  }
  if(!tracks) {
    return ReE(res, {message: 'No tracks'});
  }
  return ReS(res, {data: tracks});
}

const create = async (req, res) => {

}

module.exports = {search, create}