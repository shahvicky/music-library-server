const to = require('./../../global_functions').to;
const ReS = require('./../../global_functions').ReS
const ReE = require('./../../global_functions').ReE;
const lastfmService = require('./../services/LastFMService');
const db = require('./../models');
const logger = require('./../../config/winston');

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
  let trackId = req.params.trackId;
  let user = req.user;
  let err, track;
  [err, track] = await to(lastfmService.getTrackInfo(trackId));
  if(err) {
    return ReE(res, {message: 'Err in adding track'});
  }
  if(!track) {
    return ReE(res, {message: 'Could not add track'});
  }
  let trackObj = createTrackObj(track, user);
  console.log(trackObj);
  let trackRes;
  [err, trackRes] = await to(db.tracks.create(trackObj));
  if(err) {
    console.log(err);
    return ReE(res, {message: 'Err in adding track to account'});
  }
  return ReS(res, {message: 'Track added to your library'});
}

const createTrackObj = (trackInfo, user) => {
  let trackObj = {
    trkTrackId: trackInfo.track.mbid,
    trkUserId: user.usrUserId,
    trkTrackName: trackInfo.track.name.length > 0 ? trackInfo.track.name : '',
    trkTrackArtist: trackInfo.track.artist ? trackInfo.track.artist.name : '',
    trkTrackAlbum: trackInfo.track.album ? trackInfo.track.album.title : '',
    trkTrackUrl: trackInfo.track.url,
    trkTrackIcon: trackInfo.track.album ? (trackInfo.track.album.image ? trackInfo.track.album.image[2]['#text'] : '') : '',
    trkTrackInfo: trackInfo.track.wiki ? (trackInfo.track.wiki.summary ? trackInfo.track.wiki.summary : '') : '',
  };
  return trackObj
}

module.exports = {search, create}