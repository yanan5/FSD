//  Test Configuration Object
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/testDB2";
const DB_CONFIG = {
  url: MONGO_URL
  //url: "mongodb://localhost/TestNotesApp"
};

module.exports = {
  DB_CONFIG
};
