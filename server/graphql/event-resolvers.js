const Event = require("../model/event-model");
const Activity = require("../model/activity-model");
const { getFormattedDateTime } = require("../utils/formatDateTime");

const eventResolvers = {
  //Get Events
  Query: {
    getEvents: async () => await Event.find(),
  },

  Mutation: {
    //Create Event
    createEvent: async (_, { input }) => {
      const newEvent = new Event(input);
      await newEvent.save();

      const { date, time } = getFormattedDateTime();

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

    // Update Event
    updateEvent: async (_, { _id, input }) => {
      const updatedEvent = await Event.findByIdAndUpdate(
        _id,
        { $set: input },
        { new: true }
      );

      if (!updatedEvent) {
        throw new Error("Event not found");
      }

      const { date, time } = getFormattedDateTime();

      await Activity.create({
        message: `Event updated: ${updatedEvent.title}`,
        type: "event",
        action: "updated",
        date,
        time,
      });

      return updatedEvent;
    },
  },
};

module.exports = eventResolvers;
