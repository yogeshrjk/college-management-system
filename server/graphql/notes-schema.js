const notesTypeDef = `
  type Notes {
    _id: ID!
    title: String!
    subject: String!
    semester: String!
    author: String!
    uploadDate: String
    downloads: String
    description: String
    fileType: String
    fileSize: String
    fileUrl: String
  }

  input notesInput {
    title: String!
    subject: String!
    semester: String!
    author: String!
    description: String!
    fileType: String
    fileSize: String
    fileUrl: String
    downloads: String
  }

  type Mutation {
    createNotes(input: notesInput!): Notes
    incrementNotesDownloadCount(_id: ID!): String
    updateNotes(_id: ID!, input: notesInput!): Notes
    deleteNotes(_id: ID!): Notes
  }

  type Query {
    getNotes: [Notes]
    searchNotes(keyword: String!): [Notes]
  }
`;

module.exports = notesTypeDef;
