import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated";
import isTeacher from "../utils/isTeacher";


const GET_ALL_CLASSROOM = gql`
  query GetAllClassroom {
    getAllClassroom {
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

const ADD_MEMBER = gql`
  mutation AddMember($addMemberId: ID, $member: String) {
    addMember(id: $addMemberId, member: $member) {
      id
      member
      name
      numberMax
    }
  }
`;

const DELETE_MEMBER = gql`
  mutation DeleteMember($deleteMemberId: ID, $member: String) {
    deleteMember(id: $deleteMemberId, member: $member) {
      id
      member
      name
      numberMax
    }
  }
`;

const CREATE_CLASSROOM = gql`
  mutation CreateClassroom($name: String, $numberMax: Int) {
    createClassroom(name: $name, numberMax: $numberMax) {
      id
      member
      name
      numberMax
    }
  }
`;

const DELETE_CLASSROOM = gql`
  mutation DeleteClassroom($deleteClassroomId: ID) {
    deleteClassroom(id: $deleteClassroomId) {
      id
      name
      numberMax
    }
  }
`;

const UPDATE_CLASSROOM = gql`
  mutation UpdateClassroom($updateClassroomId: ID, $name: String, $numberMax: Int) {
    updateClassroom(id: $updateClassroomId, name: $name, numberMax: $numberMax) {
      id
      member
      name
      numberMax
    }
  }
`;

const Classroom = () => {
  const history = useNavigate();

  const [classroom, setClassroom] = useState([]);
  const [newClassroom, setNewClassroom] = useState({
    name: "",
    numberMax: 0
  });
  const [selectedClassroomID, setSelectedClassroomID] = useState(null);
  const [users, setUsers] = useState([]);
  const [memberId, setMemberId] = useState("");

  const [addMember] = useMutation(ADD_MEMBER, {
    context: {
      clientName: "classroom",
    },
  });

  const [deleteMember] = useMutation(DELETE_MEMBER, {
    context: {
      clientName: "classroom",
    },
  });

  const [createClassroom] = useMutation(CREATE_CLASSROOM, {
    context: {
      clientName: "classroom",
    },
  });

  const [deleteClassroom] = useMutation(DELETE_CLASSROOM, {
    context: {
      clientName: "classroom",
    },
  });

  const [updateClassroom] = useMutation(UPDATE_CLASSROOM, {
    context: {
      clientName: "classroom",
    },
  });

  const { loading, error, data, refetch } = useQuery(GET_ALL_CLASSROOM, {
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
      setClassroom(
        data.getAllClassroom
      );
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      setUsers(userData.getusers);
    }
  }, [userData]);

  const handleDeleteMember = async (id, member) => {
    try {
      await deleteMember({ variables: { deleteMemberId: id, member } });
      refetch();
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  };

  const handleDelete = async (id, member) => {
    try {
      await deleteClassroom({ variables: { 
        deleteClassroomId: id,
        member: member
      } });
      refetch();
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  };

  const handleAddMember = async (id) => {
    try {
      await addMember({
        variables: { 
          addMemberId: id,
          member: memberId
        },
      });
      setMemberId("");
      refetch();
    } catch (error) {
      console.error("Error adding grade:", error);
    }
  };

  const handleInputChange = (e) => {
    setMemberId(e.target.value); // Mettre à jour l'état local avec la valeur du champ input
  };

  const handleAddClassroom = async () => {
    try {
      await createClassroom({
        variables: { ...newClassroom },
      });
      setNewClassroom({ name: "", numberMax: 0 });
      refetch();
    } catch (error) {
      console.error("Error adding grade:", error);
    }
  };

  const handleUpdate = (id) => {
    setSelectedClassroomID(id);
  }

  const handleUpdateClassroom = async (id, name, numberMax) => {
    try {
      await updateClassroom({ variables: { updateClassroomId: id, name, numberMax } });
      setSelectedClassroomID(null);
      refetch();
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const classroombyname = Array.from(new Set(classroom.map((classroom) => classroom.name)));
 
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
     <div className="ui container">
      <h1 className="ui header">Classroom Details</h1>
      <div className="ui segment">
        <h2 className="ui header">Add Classroom</h2>
        <div className="ui form">
          <div className="fields">
            <div className="field">
              <input
                type="text"
                placeholder="Name"
                value={newClassroom.name}
                onChange={(e) =>
                  setNewClassroom({ ...newClassroom, name: e.target.value })
                }
              />
            </div>
            <div className="field">
              <input
                type="number"
                placeholder="Max Number"
                value={newClassroom.numberMax}
                onChange={(e) =>
                  setNewClassroom({
                    ...newClassroom,
                    numberMax: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <button className="ui button" onClick={handleAddClassroom}>
              Add
            </button>
          </div>
        </div>
      </div>
      <h2 className="ui header">List of Classrooms</h2>
      <div className="ui segment">
        <div className="ui form">
          <div className="field">
            <select
              value={selectedClassroomID}
              onChange={(e) => setSelectedClassroomID(e.target.value)}
            >
              <option value="">Filter by Classroom</option>
              {classroombyname.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="ui segment">
        {classroom.map((classroomInfo) => (
          <div key={classroomInfo.id} className="ui segment">
            <h3>Classroom</h3>
            <p>ID: {classroomInfo.id}</p>
            <p>Name: {classroomInfo.name}</p>
            <p>Max Number: {classroomInfo.numberMax}</p>
            <p>Members:</p>
            <ul>
              {classroomInfo.member.map((member, index) => (
                <li key={index}>
                  {users.find((user) => user.id === member)?.pseudo}
                  <button className="ui button" onClick={() => handleDeleteMember(classroomInfo.id, member)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="ui form">
              <div className="fields">
                <div className="field">
                  <select
                    value={memberId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.pseudo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <button className="ui button" onClick={() => handleAddMember(classroomInfo.id)}>
                    Add Member
                  </button>
                </div>
                <div className="field">
                  <button className="ui button" onClick={() => handleDelete(classroomInfo.id)}>
                    Delete
                  </button>
                </div>
                <div className="field">
                  <button className="ui button" onClick={() => handleUpdate(classroomInfo.id)}>
                    Update
                  </button>
                </div>
                {selectedClassroomID === classroomInfo.id && (
                  <div className="fields">
                    <div className="field">
                      <input
                        type="text"
                        value={newClassroom.name}
                        onChange={(e) =>
                          setNewClassroom({
                            ...newClassroom,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="field">
                      <input
                        type="number"
                        value={newClassroom.numberMax}
                        onChange={(e) =>
                          setNewClassroom({
                            ...newClassroom,
                            numberMax: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <button className="ui button" onClick={() => handleUpdateClassroom(classroomInfo.id, newClassroom.name, newClassroom.numberMax)}>
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classroom;
