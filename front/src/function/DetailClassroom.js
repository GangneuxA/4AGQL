import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Container, Header, List } from "fomantic-ui-react";

const GET_CLASSROOM_BY_NAME = gql`
    query GetClassroomByName($name: String) {
        getClassroom(name: $name) {
            id
            member
            name
            numberMax
        }
    }
`;

const GET_USERS = gql`
  query Getusers {
    getusers {
      id
      pseudo
    }
  }
`;

const ClassroomDetail = () => {

    const { name } = useParams();
    console.log(name)

    const [classroom, setClassroom] = useState([]);
    const [users, setUsers] = useState([]);

    const { loading, error, data } = useQuery(GET_CLASSROOM_BY_NAME, {
        variables: {name: name},
        context: {
          clientName: "classroom",
        },
    });

    const { data: userData } = useQuery(GET_USERS, {
    context: {
        clientName: "user",
    },
    });

    useEffect(() => {
        if (data) {
          console.log("Classroom:", data);
          setClassroom(
            data.getClassroom
          );
        }
    }, [data]);
    
    useEffect(() => {
        if (userData) {
            console.log("users:", userData);
            setUsers(userData.getusers);
        }
    }, [userData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    return (
        <Container className="member-list">
        {classroom.map((classroomInfo) => (
            <div key={classroomInfo.id} className="classroom-item">
            <Header as="h3">Classroom {classroomInfo.name}</Header>
            <p>numberMax: {classroomInfo.numberMax}</p>
            <p>Members:</p>
            <List bulleted>
                {classroomInfo.member.map((member, index) => (
                <List.Item key={index}>
                    {users.find((user) => user.id === member)?.pseudo}
                </List.Item>
                ))}
            </List>
            </div>
        ))}
        </Container>
    );
};

export default ClassroomDetail