const MONGO_CLIENT = require("mongodb").MongoClient;

const MONGO_URL = "mongodb://localhost:27017";
const DB_NAME = "testdb_1";
const COLLECTION = "products";

MONGO_CLIENT.connect(
  MONGO_URL,
  { useNewUrlParser: true },
  function(err, client) {
    if (err) {
      console.log(err);
      return err;
    }
    console.log("Connected successfully to server");
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);
    let res = collection.find({});
    res.forEach(doc => console.log(doc), err => console.log(err));
    client.close();
  }
);
