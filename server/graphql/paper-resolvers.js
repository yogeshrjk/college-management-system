const Papers = require("../model/paper-model");
const Activity = require("../model/activity-model");
const { getFormattedDateTime } = require("../utils/formatDateTime");

const paperResolvers = {
  Query: {
    // Get Papers
    getPaper: async () => await Papers.find(),

    // Search Papers
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
    // Create Papers
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

    // Update Papers

    updatePaper: async (_, { _id, input }) => {
      const updatedPaper = await Papers.findByIdAndUpdate(
        _id,
        { $set: input },
        { new: true }
      );

      if (!updatedPaper) {
        throw new Error("Paper not found");
      }

      const { date, time } = getFormattedDateTime();

      await Activity.create({
        message: `Paper updated: ${updatedPaper.title}`,
        type: "Paper",
        action: "updated",
        date,
        time,
      });

      return updatedPaper;
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

    incrementPaperDownloadCount: async (_, { _id }) => {
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
