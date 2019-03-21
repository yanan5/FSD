let passport = require("passport");
let jwtStrategy = require("passport-jwt").Strategy;
let extractJwt = require("passport-jwt").ExtractJwt;
let { getUser } = require("../api/v1/users/users.dao");
let { secret } = require("../config").appConfig.PASSPORT_CONFIG;

const opts = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

module.exports = {
  initilaizeAuth() {
    passport.use(
      new jwtStrategy(opts, async function(jwt_payload, done) {
        try {
          let user1 = await getUser({ body: { username: jwt_payload.name } });
          if (user1) {
            return done(null, user1);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        } catch (err) {
          return done(err, false);
        }
      })
    );
  }
};
