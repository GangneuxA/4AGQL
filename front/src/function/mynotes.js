import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
          <p>Tu n'est pas connecté</p>
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
    <div>
      <h1>My Grades</h1>
      {data.getGradeByStudent.map((gradeInfo) => (
        <div key={gradeInfo.id}>
          <p>Course: {gradeInfo.course}</p>
          <p>Grade: {gradeInfo.grade}</p>
        </div>
      ))}
    </div>
  );
};

export default MyNotesPage;
