let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let api = require("./api");
let { initilaizeAuth } = require("./auth");
//write your logic here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", api);
initilaizeAuth();
app.use((req, res, next) => {
  next(404);
});
app.use((err, req, res) => {
  let { status, message } = err;
  var errCode = status || err;
  var errMsg = message || "Not Found";
  res.status(errCode).send(errMsg);
});

// process.on("unhandledRejection", (reason, promise) => {
//   console.log("Unhandled Rejection at:", reason.stack || reason);
// });
module.exports = app;
