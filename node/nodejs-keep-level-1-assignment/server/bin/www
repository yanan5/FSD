// write your server code here
let app = require("../app");
let {
  appConfig: {
    SERVER_CONFIG: { port },
    DB_CONFIG: { url }
  }
} = require("../config");

let db = require("../modules");

db.initializeMongooseConnection(url);
let connection = db.getConnection();
connection.on("error", console.error.bind(console, "connection error:"));
connection.on("connected", () => console.log("connected to mongoose"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
