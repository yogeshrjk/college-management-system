const noticeTypeDef = `
    type Notice{
    _id:ID!
    title: String!
    content: String!
    date: String!
    priority: String!
    category: String!
    isPinned: Boolean!
    author: String!
    }

    input NoticeInput{
    title: String!
    content: String!
    date: String!
    priority: String!
    category: String!
    isPinned: Boolean!
    author: String!
    }

    type Mutation{
    createNotice(input:NoticeInput!):Notice
    updateNotice(_id: ID!, input: NoticeInput!): Notice
    deleteNotice(_id: ID!): Notice
    }

    type Query{
    getNotice:[Notice]
    }

`;

module.exports = noticeTypeDef;
