module.exports = {
  noteModel: require("./notes.model"),
  userModel: require("./user.model"),
  initializeMongooseConnection: require("./connection")
    .initializeMongooseConnection,
  getConnection: require("./connection").getConnection,
  closeConnection: require("./connection").closeConnection
};
