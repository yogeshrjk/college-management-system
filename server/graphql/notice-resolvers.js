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
  },
};

module.exports = noticeResolvers;
