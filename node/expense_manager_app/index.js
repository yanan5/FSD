const express = require("express");
const api = require("./server/api");
const app = express();
// import modules which you required

app.use(express.static(__dirname + "/public"));
// write middlewares here those will be executed before processing any request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// bootpoint from where routing starts
app.use("/api", api);

app.use((req, res, next) => {
  console.log("inside app use");
  next(404);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err).send("Not Found");
});
module.exports = app;
