const Notes = require("../model/notes-model");
const Activity = require("../model/activity-model");
const { getFormattedDateTime } = require("../utils/formatDateTime");

const notesResolvers = {
  Query: {
    getNotes: async () => await Notes.find(),

    searchNotes: async (_, { keyword }) => {
      if (keyword.trim().length < 3) {
        return [];
      }
      const regex = new RegExp(keyword, "i");
      return await Notes.find({
        $or: [{ title: regex }, { subject: regex }],
      });
    },
  },

  Mutation: {
    createNotes: async (_, { input }) => {
      const { fileSize, fileType, fileUrl, title } = input;
      if (!fileUrl) throw new Error("fileUrl is required");
      const { date, time } = getFormattedDateTime();
      const newNotes = new Notes({
        ...input,
        uploadDate: date,
        fileSize,
        fileType,
        fileUrl,
      });

      await newNotes.save();

      await Activity.create({
        message: `New Notes added: ${newNotes.title}`,
        type: "notes",
        action: "created",
        date,
        time,
      });

      return newNotes;
    },

    incrementDownloadCount: async (_, { id }) => {
      const note = await Notes.findById(id);
      if (!note) {
        throw new Error("Note not found");
      }

      note.downloads = Number(note.downloads || 0) + 1;
      await note.save();

      return note.downloads;
    },
  },
};

module.exports = notesResolvers;
