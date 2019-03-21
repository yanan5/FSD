const Utils = require("./utils");
const calculateInterest = require("./math/interest");

function getUserName(name) {
  return name.toUpperCase();
}

function getUserInterest(name, p, r, t) {
  const userName = getUserName(name);
  const interest = calculateInterest(p, r, t);
  console.log(userName + " interest is " + interest);
}

getUserInterest("Nikhil", 50000, 10, 1);
Utils.updateArray(
  ["ine", "two", "three", "fopur", "five", "six"],
  "Getting your shit back agfain"
);
