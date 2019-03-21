const notesDao = require("./notes.dao");

const getAllNots = (req, res, next) =>
  notesDao
    .getAllNotes(req)
    .then(doc => (res.locals.doc = doc == null || doc == undefined ? [] : doc))
    .then(() => next())
    .catch(err => next(err));

const createNote = (req, res, next) =>
  notesDao
    .createNote(req)
    .then(doc => (res.locals.doc = doc))
    .then(() => next())
    .catch(err => next(err));

const updateNote = (req, res, next) =>
  notesDao
    .updateNote(req)
    .then(doc => (res.locals.doc = doc))
    .then(() => next())
    .catch(err => next(err));

module.exports = {
  getAllNots,
  createNote,
  updateNote
};
