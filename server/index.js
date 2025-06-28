const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { connectMongoDb } = require("./config/db-connect");

const userTypeDefs = require("./graphql/user-schema");
const eventTypeDefs = require("./graphql/event-schema");

const userResolvers = require("./graphql/user-resolvers");
const eventResolvers = require("./graphql/event-resolvers");

const activityTypeDefs = require("./graphql/activity-schema");
const activityResolvers = require("./graphql/activity-resolvers");

const userRoutes = require("./routes/user-route");
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
    });

    await apolloServer.start();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Add Apollo middleware after other middleware
    app.use("/api/users", userRoutes);

    app.use("/graphql", expressMiddleware(apolloServer));

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
