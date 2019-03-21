// write your db connection code here
let mongoose = require("mongoose");
// native promises
mongoose.Promise = global.Promise;
let {
  appConfig: {
    DB_CONFIG: { url }
  }
} = require("../config");

let initializeMongooseConnection = url =>
  mongoose.connect(
    url,
    { useNewUrlParser: true, useFindAndModify: false }
  );

let getConnection = () => mongoose.connection;
let closeConnection = connection => connection.close();

module.exports = {
  initializeMongooseConnection,
  getConnection,
  closeConnection
};
