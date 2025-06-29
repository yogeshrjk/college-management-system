const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { graphqlUploadExpress } = require("graphql-upload");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { connectMongoDb } = require("./config/db-connect");

const userTypeDefs = require("./graphql/user-schema");
const eventTypeDefs = require("./graphql/event-schema");

const userResolvers = require("./graphql/user-resolvers");
const eventResolvers = require("./graphql/event-resolvers");

const activityTypeDefs = require("./graphql/activity-schema");
const activityResolvers = require("./graphql/activity-resolvers");

const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const typeDefs = mergeTypeDefs([userTypeDefs, eventTypeDefs, activityTypeDefs]);
const resolvers = mergeResolvers([
  userResolvers,
  eventResolvers,
  activityResolvers,
]);

const app = express();

(async () => {
  try {
    // Create Apollo Server
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
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
