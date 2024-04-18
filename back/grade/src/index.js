const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const models = require("./models");
const context = require("./context");

connectDB();
(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: { models },
    debug: true,
    introspection: true,
  });

  await server.start();

  app.use(
    "/",
    cors({
      origin: [
        "http://localhost:80",
        "http://localhost:3000",
        "http://localhost:443",
      ],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context,
    })
  );
  await new Promise((resolve) => httpServer.listen({ port: 4002 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4002/`);
})();
