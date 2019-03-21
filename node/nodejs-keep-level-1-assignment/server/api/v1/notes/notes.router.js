const router = require("express").Router();
const notesCtrl = require("./notes.ctrl");

router.get("/", notesCtrl.getAllNots, (req, res) => {
  res.status(200).json(res.locals.doc);
});

router.post("/", notesCtrl.createNote, (req, res) => {
  res.status(201).json(res.locals.doc);
});

router.post("/:noteId", notesCtrl.updateNote, (req, res) => {
  res.status(200).json(res.locals.doc);
});
module.exports = router;
