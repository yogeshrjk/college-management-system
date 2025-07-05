const Notice = require("../model/notice-model");
const Activity = require("../model/activity-model");
const { getFormattedDateTime } = require("../utils/formatDateTime");

const noticeResolvers = {
  //get notice
  Query: {
    getNotice: async () => await Notice.find(),
  },

  Mutation: {
    //create notice
    createNotice: async (_, { input }) => {
      const newNotice = new Notice(input);
      await newNotice.save();

      const { date, time } = getFormattedDateTime();
      // LOG THE ACTIVITY
      await Activity.create({
        message: `New Notice added: ${newNotice.title}`,
        type: "Notice",
        action: "created",
        date,
        time,
      });

      return newNotice;
    },

    // Update Notice
    updateNotice: async (_, { _id, input }) => {
      const updatedNotice = await Notice.findByIdAndUpdate(
        _id,
        { $set: input },
        { new: true }
      );

      if (!updatedNotice) {
        throw new Error("Notice not found");
      }

      const { date, time } = getFormattedDateTime();

      await Activity.create({
        message: `Notice updated: ${updatedNotice.title}`,
        type: "Notice",
        action: "updated",
        date,
        time,
      });

      return updatedNotice;
    },

    //Delete Notice
    deleteNotice: async (_, { _id }) => {
      const deletedNotice = await Notice.findByIdAndDelete(_id);
      if (!deletedNotice) {
        throw new Error("Notice not found");
      }

      const { date, time } = getFormattedDateTime();

      await Activity.create({
        message: `Notice deleted: ${deletedNotice.title}`,
        type: "Notice",
        action: "deleted",
        date,
        time,
      });

      return deletedNotice;
    },
  },
};

module.exports = noticeResolvers;
