'use strict';

var JwtStrategy = require('passport-jwt').Strategy;    //Local Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;
var { traveller } = require("./models/traveller");


// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "Lamborghini"
    };


    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log("JWT PAYLOAD ",jwt_payload);
        traveller.find({email: jwt_payload.email}, function (res) {
            var user = res;
         //   delete user.password;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));
};
