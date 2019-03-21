var jwt = require("jsonwebtoken");

module.exports = {
  signJWTToken(payload, secret, expireIn, callback) {
    jwt.sign(payload, secret, { expiresIn: expireIn }, callback);
  },
  verifyJWTToken(token, secret, callback) {
    jwt.verify(token, secret, callback);
  }
};
