const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { graphqlUploadExpress } = require("graphql-upload");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { connectMongoDb } = require("./config/db-connect");
const cors = require("cors");
const { typeDefs, resolvers } = require("./graphql");

const mergedTypeDefs = mergeTypeDefs(typeDefs);
const mergedResolvers = mergeResolvers(resolvers);

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();

(async () => {
  try {
    // Create Apollo Server
    const apolloServer = new ApolloServer({
      typeDefs: mergedTypeDefs,
      resolvers: mergedResolvers,
      csrfPrevention: false,
      formatError: (err) => {
        console.error("GraphQL error:", err);
        return err;
      },
    });

    await apolloServer.start();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(graphqlUploadExpress());

    // Add Apollo middleware after other middleware
    app.use(
      "/graphql",
      expressMiddleware(apolloServer, {
        context: async ({ req }) => {
          // Optional JWT decoding here
          return {};
        },
      })
    );

    // Connect to MongoDB
    await connectMongoDb(process.env.MONGO_URI);
    //Start Express Server
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
})();
