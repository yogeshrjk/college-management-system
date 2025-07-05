const eventTypeDefs = `
  type Event {
    _id: ID!
    title: String
    description: String
    date: String
    time: String
    location: String
    attendees: Int
    category: String
    status: String
  }

  input EventInput {
    title: String
    description: String
    date: String
    time: String
    location: String
    attendees: Int
    category: String
    status: String
  }

  type Mutation {
    createEvent(input: EventInput!): Event
    updateEvent(_id: ID!, input: EventInput!): Event
    deleteEvent(_id: ID!): Event
  }

  type Query {
    getEvents: [Event]
  }
`;

module.exports = eventTypeDefs;
