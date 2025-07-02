module.exports = {
  typeDefs: [
    require("./user-schema"),
    require("./event-schema"),
    require("./activity-schema"),
    require("./notice-schema"),
    require("./notes-schema"),
    require("./paper-schema"),
  ],
  resolvers: [
    require("./user-resolvers"),
    require("./event-resolvers"),
    require("./activity-resolvers"),
    require("./notice-resolvers"),
    require("./notes-resolvers"),
    require("./paper-resolvers"),
  ],
};
