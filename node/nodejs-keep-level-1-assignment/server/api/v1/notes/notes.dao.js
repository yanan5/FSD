const { noteModel } = require("../../../modules");

const getValues = valObj =>
  Object.keys(valObj).reduce((accObj, key) => {
    if (valObj[key] !== null && valObj[key] !== undefined) {
      accObj[key] = valObj[key];
      return accObj;
    }
    return accObj;
  }, {});

const getAllNotes = ({ body: { userId } }) => noteModel.find({ userId }).exec();

const createNote = ({ body: { userId, title, text, state } }) => {
  let note = new noteModel({
    userId,
    title,
    text,
    state,
    createdOn: "",
    modifiedOn: ""
  });
  return note.save();
};
const updateNote = req => {
  let {
    body: { title, text, state, createdOn, modifiedOn }
  } = req;
  return noteModel
    .findByIdAndUpdate(
      { _id: req.params.noteId },
      { ...getValues({ title, text, state, createdOn, modifiedOn }) },
      { new: true }
    )
    .exec();
};

module.exports = {
  getAllNotes,
  createNote,
  updateNote
};
