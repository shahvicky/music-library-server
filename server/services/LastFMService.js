const rp = require('request-promise');
const config = require('./../../config/config')
const to = require('./../../global_functions').to;
const TE = require('./../../global_functions').TE;
const logger = require('./../../config/winston');
const baseURL = config.lastfm.baseURL;
const apiKey = config.lastfm.apiKey;

const searchMusic = async (searchKey) => {
  let searchURL = `${baseURL}/2.0/?method=track.search`;
  let options = {
    uri: searchURL,
    qs: {
      track: searchKey,
      api_key: apiKey,
      format: 'json'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  let err, trackRes;
  [err, trackRes] = await to(rp(options));
  if(err) {
    logger.log(err);
    return TE('Error in finding tracks with the search key');
  } else if(!trackRes) {
    logger.log("No track with serch id");
    return TE('No tracks');
  } else {
    logger.log(trackRes);
    return trackRes;
  }
}

const getTrackInfo = async (trackId) => {
  let trackInfoURL = `${baseURL}/2.0/?method=track.getInfo`;
  let options = {
    uri: trackInfoURL,
    qs: {
      mbid: trackId,
      api_key: apiKey,
      format: 'json'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  let err, track;
  [err, track] = await to(rp(options));
  if(err) {
    logger.log('error in getting track info');
    return TE('Err in getting track info');
  }
  if(!track) {
    logger.log('No track found')
    return TE('No track found');
  }
  return track;
}

module.exports = {searchMusic, getTrackInfo}