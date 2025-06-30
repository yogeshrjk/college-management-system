const noticeTypeDef = `
    type Notice{
    id:ID!
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
    }

    type Query{
    getNotice:[Notice]
    }

`;

module.exports = noticeTypeDef;
