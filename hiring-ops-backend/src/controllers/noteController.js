const noteService = require("../services/noteService");

const addNote = async (req, res) => {
  try {

    const { content } = req.body;

    const note = await noteService.addNote(
      req.params.applicationId,
      req.user,
      content
    );

    res.status(201).json(note);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getNotes = async (req, res) => {
  try {

    const notes = await noteService.getApplicationNotes(
      req.params.applicationId,
      req.user
    );

    res.json(notes);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {

    await noteService.removeNote(
      req.params.noteId,
      req.user._id
    );

    res.json({ message: "Note deleted" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addNote,
  getNotes,
  deleteNote
};