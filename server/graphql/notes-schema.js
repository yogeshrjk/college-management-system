const notesTypeDef = `
  type Notes {
    id: ID!
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
    incrementDownloadCount(id: ID!): String
  }

  type Query {
    getNotes: [Notes]
    searchNotes(keyword: String!): [Notes]
  }
`;

module.exports = notesTypeDef;
