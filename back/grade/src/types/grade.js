const gql = require("graphql-tag");

const grade = gql`
  type Query {
    getAllGrade: [Grade] #return array of Grades
    getGradeByStudent(student: String): [Grade] #return grade by student
    getGradeByCourse(course: String): [Grade] #return grade by course
  }

  # Grade object
  type Grade {
    id: ID
    student: String
    course: String
    grade: Int
  }

  type Mutation {
    createGrade(student: String, course: String, grade: Int): Grade
    deleteGrade(id: ID): Grade
    updateGrade(id: ID, grade: Int): Grade
  }
`;

module.exports = { grade };