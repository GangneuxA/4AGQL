import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated";
import isTeacher from "../utils/isTeacher";

const GET_ALL_GRADE = gql`
  query GetAllGrade {
    getAllGrade {
      id
      student
      course
      grade
    }
  }
`;
const GET_GRADE_BY_STUDENT = gql`
  query GetGradeByStudent($student: String) {
    getGradeByStudent(student: $student) {
      id
      student
      course
      grade
    }
  }
`;
const GET_GRADE_BY_COURSE = gql`
  query GetGradeByCourse($course: String) {
    getGradeByCourse(course: $course) {
      id
      student
      course
      grade
    }
  }
`;

const DELETE_GRADE = gql`
  mutation DeleteGrade($id: ID) {
    deleteGrade(id: $id) {
      course
      grade
      id
      student
    }
  }
`;

const ADD_GRADE = gql`
  mutation AddGrade($student: String!, $course: String!, $grade: Int!) {
    createGrade(student: $student, course: $course, grade: $grade) {
      id
      student
      course
      grade
    }
  }
`;

const UPDATE_GRADE = gql`
  mutation UpdateGrade($id: ID!, $grade: Int!) {
    updateGrade(id: $id, grade: $grade) {
      id
      student
      course
      grade
    }
  }
`;

const GradeDetails = () => {
  const history = useNavigate();
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({
    student: "",
    course: "",
    grade: 0,
  });
  const [selectedGradeId, setSelectedGradeId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [addGrade] = useMutation(ADD_GRADE, {
    context: {
      clientName: "grade",
    },
  });
  const [updateGrade] = useMutation(UPDATE_GRADE, {
    context: {
      clientName: "grade",
    },
  });
  const [deleteGrade] = useMutation(DELETE_GRADE, {
    context: {
      clientName: "grade",
    },
  });
  const { loading, error, data, refetch } = useQuery(
    selectedStudent
      ? GET_GRADE_BY_STUDENT
      : selectedCourse
      ? GET_GRADE_BY_COURSE
      : GET_ALL_GRADE,
    {
      variables: { student: selectedStudent, course: selectedCourse },
      context: {
        clientName: "grade",
      },
    }
  );

  useEffect(() => {
    if (data) {
      setGrades(
        data.getAllGrade || data.getGradeByStudent || data.getGradeByCourse
      );
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await deleteGrade({ variables: { id } });
      setGrades(grades.filter((grade) => grade.id !== id));
      refetch();
    } catch (error) {
      console.error("Error deleting grade:", error);
    }
  };

  const handleAddGrade = async () => {
    try {
      await addGrade({
        variables: { ...newGrade },
      });
      setNewGrade({ student: "", course: "", grade: 0 });
      refetch();
    } catch (error) {
      console.error("Error adding grade:", error);
    }
  };

  const handleUpdate = (id) => {
    setSelectedGradeId(id);
  };

  const handleUpdateGrade = async (id, gradeValue) => {
    try {
      await updateGrade({ variables: { id, grade: gradeValue } });
      setSelectedGradeId(null);
      refetch();
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const students = Array.from(new Set(grades.map((grade) => grade.student)));
  const courses = Array.from(new Set(grades.map((grade) => grade.course)));

  const handleBackTolink = () => {
    let path = `/login`;
    history(path);
  };
  const handleBackToHome = () => {
    let path = `/`;
    history(path);
  };

  if (!isAuthenticated()) {
    return (
      <div>
        <p>Tu n'es pas connecté</p>
        <button onClick={handleBackTolink}>login</button>
      </div>
    );
  }
  if (!isTeacher()) {
    return (
      <div>
        <p>tu n'est pas teacher tu ne peut pas modifer les notes</p>
        <button onClick={handleBackToHome}>Home</button>
      </div>
    );
  }
  return (
    <div className="grade-container">
      <h1>Grade Details</h1>
      <div className="add-grade-section">
        <h2>Add Grade</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Student"
            value={newGrade.student}
            onChange={(e) =>
              setNewGrade({ ...newGrade, student: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Course"
            value={newGrade.course}
            onChange={(e) =>
              setNewGrade({ ...newGrade, course: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Grade"
            value={newGrade.grade}
            onChange={(e) =>
              setNewGrade({ ...newGrade, grade: parseInt(e.target.value) })
            }
          />
          <button onClick={handleAddGrade}>Add</button>
        </div>
      </div>
      <h2>List of Grades</h2>
      <div>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Filter by Student</option>
          {students.map((student) => (
            <option key={student} value={student}>
              {student}
            </option>
          ))}
        </select>
        <p>Or</p>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Filter by Course</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
      <div className="grade-list">
        {grades.map((gradeInfo) => (
          <div key={gradeInfo.id} className="grade-item">
            <h3>Grade</h3>
            <p>ID: {gradeInfo.id}</p>
            <p>Student: {gradeInfo.student}</p>
            <p>Course: {gradeInfo.course}</p>
            <p>Grade: {gradeInfo.grade}</p>
            <div className="button-group">
              <button onClick={() => handleDelete(gradeInfo.id)}>Delete</button>
              <button onClick={() => handleUpdate(gradeInfo.id)}>Update</button>
              {selectedGradeId === gradeInfo.id && (
                <div>
                  <input
                    type="number"
                    value={newGrade.grade}
                    onChange={(e) =>
                      setNewGrade({
                        ...newGrade,
                        grade: parseInt(e.target.value),
                      })
                    }
                  />
                  <button
                    onClick={() =>
                      handleUpdateGrade(gradeInfo.id, newGrade.grade)
                    }
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeDetails;
