const Activity = require("../model/activity-model");

const activityResolvers = {
  Query: {
    getActivities: async () => await Activity.find().sort({ createdAt: -1 }),
  },
};

module.exports = activityResolvers;
