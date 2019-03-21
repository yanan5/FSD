const MONGO_CLIENT = require("mongodb").MongoClient;

const MONGO_URL = "mongodb://localhost:27017";
const DB_NAME = "testdb_1";
const COLLECTION = "products";

let client = new MONGO_CLIENT(MONGO_URL, { useNewUrlParser: true });

(async function() {
  try {
    await client.connect();
    console.log("connected to mongo client successfully");
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);
    let cursor = collection.find({});
    while (await cursor.hasNext()) {
      let doc = await cursor.next();
      console.log(doc);
    }
    let aggCursor = collection.aggregate([
      { $group: { _id: "$item", total: { $sum: "$qty" } } }
    ]);
    while (await aggCursor.hasNext()) {
      let doc = await aggCursor.next();
      console.log(doc);
    }
  } catch (err) {
    console.log(err, err.stack);
  }
  client.close();
})();
