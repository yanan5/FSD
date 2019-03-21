let mongoose = require("mongoose");
let NotesSchema = require("./notes.Schema");

let Note = mongoose.model("note", NotesSchema);

module.exports = Note;
