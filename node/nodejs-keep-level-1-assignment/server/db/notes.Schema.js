let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let NotesSchema = new Schema({
  userId: String,
  title: String,
  text: String,
  state: String,
  createdOn: Date,
  modifiedOn: Date
});
NotesSchema.pre("save", function(next) {
  this.createdOn = new Date();
  this.modifiedOn = new Date();
  next();
});
NotesSchema.pre("update", function() {
  this.update({}, { $set: { modifiedOn: new Date() } });
});
module.exports = NotesSchema;
