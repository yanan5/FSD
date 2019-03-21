const path = require("path");
const fs = require("fs");
const util = require("util");

let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

module.exports = {
  readFileAsync: async filePath =>
    await readFile(path.join(__dirname + "./../" + filePath)),
  isEmpty: val =>
    val == null ||
    val == undefined ||
    (typeof val === "string" && val.trim() === ""),
  isEmptyObj: obj => Object.keys(obj).length === 0,
  isEmptyArr: arr => arr.length === 0
};
