const Event = require("../model/event-model");
const Activity = require("../model/activity-model");
const { getFormattedDateTime } = require("../utils/formatDateTime");

const eventResolvers = {
  Query: {
    getEvents: async () => await Event.find(),
  },
  Mutation: {
    createEvent: async (_, { input }) => {
      // A GraphQL resolver function generally receives four parameter (parent, args, context, info)
      const newEvent = new Event(input);
      await newEvent.save();

      const { date, time } = getFormattedDateTime();

      // LOG THE ACTIVITY
      await Activity.create({
        message: `New event added: ${newEvent.title} scheduled on ${newEvent.date}`,
        type: "event",
        action: "created",
        date,
        time,
      });

      return newEvent;
    },
    //Delete Event
    deleteEvent: async (_, { _id }) => {
      const deletedEvent = await Event.findByIdAndDelete(_id);
      if (!deletedEvent) {
        throw new Error("Event not found");
      }

      const { date, time } = getFormattedDateTime();

      await Activity.create({
        message: `Event deleted: ${deletedEvent.title}`,
        type: "event",
        action: "deleted",
        date,
        time,
      });

      return deletedEvent;
    },
  },
};

module.exports = eventResolvers;
