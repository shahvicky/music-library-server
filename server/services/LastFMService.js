const rp = require('request-promise');
const config = require('./../../config/config')
const to = require('./../../global_functions').to;
const TE = require('./../../global_functions').TE;

const searchMusic = async (searchKey) => {
  let baseURL = config.lastfm.baseURL;
  let apiKey = config.lastfm.apiKey;
  let searchURL = `${baseURL}/2.0/?method=track.search`;
  // let searchURL = `${baseURL}/2.0/?method=track.search&track=${searchKey}&api_key=${apiKey}&format=json`;
  let options = {
    uri: searchURL,
    qs: {
      track:searchKey,
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
    console.log(err);
    return TE('Error in finding tracks with the search key');
  } else if(!trackRes) {
    console.log("No track with serch id");
    return TE('No tracks');
  } else {
    console.log(trackRes);
    return trackRes;
  }

}

module.exports = {searchMusic}