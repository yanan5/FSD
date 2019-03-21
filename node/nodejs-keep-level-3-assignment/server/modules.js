/* Replace undefined with Require of your Mongoose connection initialization method */
const { initializeMongooseConnection, getConnection } = require("./db");
/* Replace undefined with Require of your note entity*/
const noteModel = require("./db").noteModel;
/* Replace undefined with Require of your user entity*/
const userModel = require("./db").userModel;
/* Replace undefined with the method or function reference, which signs the token with given payload, expiry time and secret, call back should have error or signed token */
const signJWTToken = require("./jwt").signJWTToken;
/* Replace undefined with the method or function reference, which verifies a given JWT Token and callback with error & payload */
const verifyJWTToken = require("./jwt").verifyJWTToken;

module.exports = {
  initializeMongooseConnection,
  getConnection,
  noteModel,
  userModel,
  signJWTToken,
  verifyJWTToken
};
