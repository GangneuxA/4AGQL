const gql = require("graphql-tag");

const users = gql`
  type Query {
    getusers: [Users] #return array of students
    getuser(id: ID): Users #return student by id
    getme: Users
  }

  # Student object
  type Users {
    id: ID
    email: String
    pseudo: String
    role: String
    password: String
  }
  type Tokens {
    id: ID!
    role: String!
    accessToken: String
    refreshToken: String
  }

  type Mutation {
    login(email: String!, password: String!): Tokens
    createuser(email: String, pseudo: String, password: String): Users
    deleteuser: Users
    updateuser(pseudo: String, email: String, password: String): Users
    setteacher: Users
  }
`;

module.exports = { users };
