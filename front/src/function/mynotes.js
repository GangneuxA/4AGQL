import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Container, Header, List } from "fomantic-ui-react";

const GET_GRADE_BY_STUDENT = gql`
  query GetGradeByStudent($student: String!) {
    getGradeByStudent(student: $student) {
      course
      grade
      id
    }
  }
`;

const MyNotesPage = () => {
  const history = useNavigate();
  const handleBackToHome = () => {
    let path = `/login`;
    history(path);
  };

  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const idFromLocalStorage = localStorage.getItem("id");
    if (idFromLocalStorage) {
      console.log(idFromLocalStorage);
      setStudentId(idFromLocalStorage);
    } else {
      return (
        <div>
          <p>Tu n'es pas connecté</p>
          <button onClick={handleBackToHome}>login</button>
        </div>
      );
    }
  }, []);

  const { loading, error, data } = useQuery(GET_GRADE_BY_STUDENT, {
    variables: { student: studentId },
    context: {
      clientName: "grade",
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Header as="h1">My Grades</Header>
      <List divided relaxed>
        {data.getGradeByStudent.map((gradeInfo) => (
          <List.Item key={gradeInfo.id}>
            <List.Content>
              <List.Header>Course: {gradeInfo.course}</List.Header>
              <List.Description>Grade: {gradeInfo.grade}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  );
};

export default MyNotesPage;
