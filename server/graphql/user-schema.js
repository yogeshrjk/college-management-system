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
    role: String
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
    _id:ID!
    phoneNumber: String
    dob: String
    email: String
    gender: String
    password: String
    profilePic: Upload
    ):User!

  changePassword(
    _id: ID!
    oldPassword: String!
    newPassword: String!
  ): Boolean
}

  type Query {
    getUser(_id: ID!): User
  }
`;

module.exports = userTypeDefs;
