let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let passUtil = require("../utils");
let UserSchema = new Schema({
  username: String,
  password: String
});
UserSchema.pre("save", function(next) {
  let doc = this;
  if (!this.isModified("password")) return next();
  passUtil
    .hashPassword(doc.password, 10)
    .then(hash => {
      doc.password = hash;
      next();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
});
// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//   passUtil
//     .comparePassword(candidatePassword, this.password)
//     .then(isMatch => isMatch)
//     .catch(err => throw err);
// };
module.exports = UserSchema;
