let mongoose = require("mongoose");
let UserSchema = require("./user.Schema");

let User = mongoose.model("user", UserSchema);

module.exports = User;
