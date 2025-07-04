const notesTypeDef = `
  type Notes {
    _id: ID!
    title: String!
    subject: String!
    semester: String!
    author: String!
    uploadDate: String
    downloads: Int
    description: String
    fileType: String
    fileSize: String
    fileUrl: String
  }

  input CreateNotesInput {
    title: String!
    subject: String!
    semester: String!
    author: String!
    description: String!
    fileType: String
    fileSize: String
    fileUrl: String
  }

  type Mutation {
    createNotes(input: CreateNotesInput!): Notes
    incrementDownloadCount(_id: ID!): String
    deleteNotes(_id: ID!): Notes
  }

  type Query {
    getNotes: [Notes]
    searchNotes(keyword: String!): [Notes]
  }
`;

module.exports = notesTypeDef;
