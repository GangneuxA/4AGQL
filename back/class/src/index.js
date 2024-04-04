const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const models = require('./models');
const context = require('./context');
const server = new ApolloServer({ typeDefs, resolvers ,context: {models}});

dotenv.config();
connectDB();

//const serverWithMiddleware = applyMiddleware(server, permissions);

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: context,
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});