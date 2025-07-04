const Notice = require("../model/notice-model");
const Activity = require("../model/activity-model");
const { getFormattedDateTime } = require("../utils/formatDateTime");

const noticeResolvers = {
  Query: {
    getNotice: async () => await Notice.find(),
  },

  Mutation: {
    createNotice: async (_, { input }) => {
      const newNotice = new Notice(input);
      await newNotice.save();

      const { date, time } = getFormattedDateTime();
      // LOG THE ACTIVITY
      await Activity.create({
        message: `New Notice added: ${newNotice.title}`,
        type: "event",
        action: "created",
        date,
        time,
      });

      return newNotice;
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
