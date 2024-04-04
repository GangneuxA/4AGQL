const gql = require("graphql-tag");

const users = gql`
  type Query {
    getusers: [Users] #return array of students
    getuser(id: ID): Users #return student by id
  }

  # Student object
  type Users {
    id: ID
    email: String
    pseudo: String
    role: String
    password: String
  }
  type loginOutput {
    id: ID
    token: String
  }

type Mutation {
    login(email: String, password: String): loginOutput
    createuser(email: String, pseudo: String, password: String): Users
    deleteuser(id: ID): Users
    updateuser(id: ID, pseudo: String, email: String, password: String): Users
  }
`;

module.exports = { users };