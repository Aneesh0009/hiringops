const Note = require("../models/Note");

const createNote = (data) => {
  return Note.create(data);
};

const getNotesByApplication = (applicationId) => {
  return Note.find({ applicationId }).populate("recruiterId", "fullName");
};

const deleteNote = (noteId, recruiterId) => {
  return Note.findOneAndDelete({
    _id: noteId,
    recruiterId
  });
};

module.exports = {
  createNote,
  getNotesByApplication,
  deleteNote
};