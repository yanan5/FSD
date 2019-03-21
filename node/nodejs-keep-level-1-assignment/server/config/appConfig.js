// write your application configration here
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/testDB";
const SERVER_CONFIG = {
  port: process.env.PORT || 3000
};

const DB_CONFIG = {
  url: MONGO_URL
  //url: "mongodb://localhost/NotesApp"
};

module.exports = {
  SERVER_CONFIG,
  DB_CONFIG
};
