module.exports = {
  typeDefs: [
    require("./user-schema"),
    require("./event-schema"),
    require("./activity-schema"),
    require("./notice-schema"),
  ],
  resolvers: [
    require("./user-resolvers"),
    require("./event-resolvers"),
    require("./activity-resolvers"),
    require("./notice-resolvers"),
  ],
};
