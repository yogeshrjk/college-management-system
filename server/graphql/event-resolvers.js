const Event = require("../model/event-model");
const Activity = require("../model/activity-model");
const { getFormattedDateTime } = require("../utils/formatDateTime");

const eventResolvers = {
  Query: {
    getEvents: async () => await Event.find(),
  },
  Mutation: {
    createEvent: async (_, { input }) => {
      const newEvent = new Event(input);
      await newEvent.save();

      const { date, time } = getFormattedDateTime();

      // LOG THE ACTIVITY
      await Activity.create({
        message: `Event '${newEvent.title}' created`,
        type: "event",
        action: "created",
        date,
        time,
      });

      return newEvent;
    },
  },
};

module.exports = eventResolvers;
