const userTypeDefs = `
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    profilePic: String
  }

  type Query {
    getUser(id: ID!): User
  }
`;

module.exports = userTypeDefs;
