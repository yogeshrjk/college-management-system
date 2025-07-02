const paperTypeDefs = `
  type Paper {
    id: ID!
    title: String!
    subject: String!
    semester: String!
    year: String!
    examType: String
    duration: String
    maxMarks: Int!
    uploadDate: String
    downloads: String
    fileSize: String
    fileUrl: String
  }

  input CreatePapersInput {
    title: String!
    subject: String!
    semester: String!
    year: String!
    examType: String
    duration: String
    maxMarks: Int!
    uploadDate: String
    downloads: String
    fileSize: String
    fileUrl: String
  }

  type Mutation {
    createPapers(input: CreatePapersInput!): Paper
    incrementDownloadCount(id: ID!): String
  }

  type Query {
    getPaper: [Paper]
  }
`;

module.exports = paperTypeDefs;
