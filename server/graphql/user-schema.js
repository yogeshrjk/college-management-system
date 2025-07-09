const userTypeDefs = `
  scalar Upload
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    dob: String!
    email: String!
    gender: String!
    profilePic: String
    token: String
  }
type Mutation {
  signup(
    firstName: String!
    lastName: String!
    phoneNumber: String!
    dob: String!
    email: String!
    gender: String!
    password: String!
    profilePic: Upload
  ): User!

  login(
  email: String!
  password: String!
  ):User!

  updateUser(
    phoneNumber: String!
    dob: String!
    email: String!
    gender: String!
    password: String!
    profilePic: Upload):User!
}
  type Query {
    getUser(id: ID!): User
  }
`;

module.exports = userTypeDefs;
