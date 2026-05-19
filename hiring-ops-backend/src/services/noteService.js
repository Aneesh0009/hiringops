const noteRepository = require("../repositories/noteRepository");
const Application = require("../models/Application");

const addNote = async (applicationId, recruiter, content) => {

  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  if (application.companyId.toString() !== recruiter.companyId.toString()) {
    throw new Error("Unauthorized");
  }

  const noteData = {
    applicationId,
    recruiterId: recruiter._id,
    companyId: recruiter.companyId,
    content
  };

  return noteRepository.createNote(noteData);
};

const getApplicationNotes = async (applicationId, recruiter) => {

  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  if (application.companyId.toString() !== recruiter.companyId.toString()) {
    throw new Error("Unauthorized");
  }

  return noteRepository.getNotesByApplication(applicationId);
};

const removeNote = (noteId, recruiterId) => {
  return noteRepository.deleteNote(noteId, recruiterId);
};

module.exports = {
  addNote,
  getApplicationNotes,
  removeNote
};