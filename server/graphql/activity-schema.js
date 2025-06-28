const activityTypeDefs = `
  type Activity {
    _id: ID!
    message: String
    type: String
    action: String
    createdAt: String
    time: String
    date:String
  }

  type Query {
    getActivities: [Activity]
  }

  type Mutation {
    logActivity(message: String!, type: String!, action: String!): Activity
  }
`;

module.exports = activityTypeDefs;
