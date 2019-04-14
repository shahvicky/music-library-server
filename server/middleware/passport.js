/*
 * passport.js works with the concept of strategies. 
 * They basically are a middleware function that a requests
 * runs through before getting to the actual route. If your
 * defined authentication strategy fails, which means that 
 * the callback will be called with an error that is not null
 * or false as the second argument, the route will not be 
 * called, but a 401 Unauthorized response will be sent.
 */

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const config = require('./../../config/config');
const to = require('./../../global_functions').to;

/*Here the strategy we’re going to use for the web token authentication */

module.exports =  (passport) => {
    let User = db.users;    //change this
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.jwtSecret;

    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        let err, user;
        [err, user] = await to(User.findOne({where: {usrUserId:jwt_payload.user_id}}));
        // logger.debug('user', user.usrUserId);
        if(err) return done(err, false);
        if(!user.usrRowActiveFlag) {
            return done(null, false)
        }
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
}