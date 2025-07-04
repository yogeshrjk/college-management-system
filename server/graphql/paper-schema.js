const paperTypeDefs = `
  type Paper {
    _id: ID!
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
    incrementDownloadCount(_id: ID!): String
    deletePaper(_id: ID!): Paper
  }

  type Query {
    getPaper: [Paper]
    searchPaper(keyword: String!): [Paper]
  }
`;

module.exports = paperTypeDefs;
