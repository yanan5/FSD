/* Replace undefined with Require of your Mongoose connection initialization method */
const { initializeMongooseConnection, getConnection } = require("./db");
/* Replace undefined with Require of your note entity*/
const noteModel = require("./db").noteModel;
/* Replace undefined with Require of your user entity*/
const userModel = require("./db").userModel;

module.exports = {
  initializeMongooseConnection,
  getConnection,
  noteModel,
  userModel
};
