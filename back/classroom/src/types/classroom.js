const gql = require("graphql-tag");

const Classroom = gql`
  type Query {
    getClassroom(name: String): [Classroom] #return classroom by name
    getAllClassroom: [Classroom] #return all classroom
  }

  # Classroom object
  type Classroom {
    id: ID
    name: String
    numberMax: Int
  }

  type Mutation {
    createClassroom(name: String, numberMax: Int): Classroom
    deleteClassroom(id: ID): Classroom
    updateClassroom(id: ID, name: String, numberMax: Int): Classroom

  }
`;

module.exports = { Classroom };