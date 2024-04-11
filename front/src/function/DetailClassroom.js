import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
  const [selectedName, setSelectedName] = useState("");

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

  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    if (data) {
      setClassroom(
        data.getAllClassroom
      );
    }
  }, [data]);

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
 
  return (
    <div className="classroom-container">
      <h1>Classroom Details</h1>
      <div className="add-classroom-section">
        <h2>Add Classroom</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="name"
            value={newClassroom.name}
            onChange={(e) =>
              setNewClassroom({ ...newClassroom, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="numberMax"
            value={newClassroom.numberMax}
            onChange={(e) =>
              setNewClassroom({ ...newClassroom, numberMax: parseInt(e.target.value) })
            }
          />
          <button onClick={handleAddClassroom}>Add</button>
        </div>
      </div>
      <h2>List of Classroom</h2>
      <div>
        <select
          value={selectedClassroomID}
          onChange={(e) => setSelectedClassroomID(e.target.value)}
        >
          <option value="">Filter by Classroom</option>
          {classroombyname.map((classroom) => (
            <option key={classroom} value={classroom}>
              {classroom}
            </option>
          ))}
        </select>
      </div>
      <div className="classroom-list">
        {classroom.map((classroomInfo) => (
          <div key={classroomInfo.id} className="classroom-item">
            <h3>Classroom</h3>
            <p>ID: {classroomInfo.id}</p>
            <p>name: {classroomInfo.name}</p>
            <p>numberMax: {classroomInfo.numberMax}</p>
            <p>Members:</p>
            <ul>
              {classroomInfo.member.map((member, index) => (
                <li key={index}>
                  {member} 
                  <button onClick={() => handleDeleteMember(classroomInfo.id, member)}>Delete</button>
                </li>
              ))}
            </ul>
            <input
                name="memberID"
                type="text"
                placeholder="memberID"
                value={memberId} // Liaison de la valeur à l'état local
                onChange={handleInputChange} // Gérer le changement de valeur
              />
            <div className="button-group">
              <button onClick={() => handleAddMember(classroomInfo.id)}>AddMember</button>
              <button onClick={() => handleDelete(classroomInfo.id)}>Delete</button>
              <button onClick={() => handleUpdate(classroomInfo.id)}>Update</button>
              {selectedClassroomID === classroomInfo.id && (
                <div>
                  <input
                    type="name"
                    value={newClassroom.name}
                    onChange={(e) =>
                      setNewClassroom({
                        ...newClassroom,
                        name: e.target.value,
                      })
                    }
                  />
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
                  <button
                    onClick={() =>
                      handleUpdateClassroom(classroomInfo.id, newClassroom.name, newClassroom.numberMax)
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

export default Classroom;
