const Papers = require("../model/paper-model");
const Activity = require("../model/activity-model");
const { getFormattedDateTime } = require("../utils/formatDateTime");

const paperResolvers = {
  Query: {
    getPaper: async () => await Papers.find(),

    searchPaper: async (_, { keyword }) => {
      if (keyword.trim().length < 3) {
        return [];
      }
      const regex = new RegExp(keyword, "i");
      return await Papers.find({
        $or: [{ title: regex }, { subject: regex }],
      });
    },
  },

  Mutation: {
    createPapers: async (_, { input }) => {
      const { date, time } = getFormattedDateTime();
      const { fileSize, fileUrl } = input;
      if (!fileUrl) throw new Error("fileUrl is required");
      const newPaper = new Papers({
        ...input,
        uploadDate: date,
        fileSize,
        fileUrl,
      });

      await newPaper.save();

      await Activity.create({
        message: `New Paper added: ${newPaper.title}`,
        type: "paper",
        action: "created",
        date,
        time,
      });

      return newPaper;
    },

    //Delete Paper
    deletePaper: async (_, { _id }) => {
      const deletedPaper = await Papers.findByIdAndDelete(_id);
      if (!deletedPaper) {
        throw new Error("Paper not found");
      }

      const { date, time } = getFormattedDateTime();

      await Activity.create({
        message: `Paper deleted: ${deletedPaper.title}`,
        type: "Paper",
        action: "deleted",
        date,
        time,
      });

      return deletedPaper;
    },

    incrementDownloadCount: async (_, { _id }) => {
      const paper = await Papers.findById(_id);
      if (!paper) {
        throw new Error("Paper not found");
      }

      paper.downloads = Number(paper.downloads || 0) + 1;
      await paper.save();

      return paper.downloads;
    },
  },
};

module.exports = paperResolvers;
