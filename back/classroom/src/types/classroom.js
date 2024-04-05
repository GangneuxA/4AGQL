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
    member: [String]
  }

  type Mutation {
    createClassroom(name: String, numberMax: Int): Classroom
    deleteClassroom(id: ID): Classroom
    updateClassroom(id: ID, name: String, numberMax: Int): Classroom
    addMember(id: ID, member: String): Classroom
    deleteMember(id: ID, member: String): Classroom

  }
`;

module.exports = { Classroom };