const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
require("dotenv").config();
const connectDB = require('./config/db');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const models = require('./models');
const context = require('./context');

connectDB();

const server = new ApolloServer({ 
  typeDefs, 
  resolvers ,
  context: {models},  
  debug: true,  // Currently "true"
  introspection: true,  // Currently "true"
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context
  //context: context
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});