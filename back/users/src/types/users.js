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
    name: String
    age: Int
    password: String
  }
  type loginOutput {
    id: ID
    token: String
  }

type Mutation {
    login(email: String, password: String): loginOutput
    createuser(email: String, name: String, age: Int, password: String): Users
    deleteuser(id: ID): Users
    updateuser(id: ID, name: String, email: String, age: Int, password: String): Users
  }
`;

module.exports = { users };