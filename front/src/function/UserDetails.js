import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import isAuthenticated from "../utils/isAuthenticated";
import { useNavigate } from "react-router-dom";
import { Container, Header, Button, Input } from "fomantic-ui-react";

const GET_USER_BY_CRITERIA = gql`
  query Getme {
    getme {
      email
      id
      pseudo
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($pseudo: String, $email: String, $password: String) {
    updateuser(pseudo: $pseudo, email: $email, password: $password) {
      id
      email
      pseudo
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser {
    deleteuser {
      id
    }
  }
`;

function UserDetails() {
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_CRITERIA, {
    context: {
      clientName: "user",
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    context: {
      clientName: "user",
    },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    context: {
      clientName: "user",
    },
  });

  const [formData, setFormData] = useState({
    email: data?.getme?.email || "",
    pseudo: data?.getme?.pseudo || "",
    password: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      console.log({
        pseudo: formData.pseudo,
        email: formData.email,
        password: formData.password,
      });
      await updateUser({
        variables: {
          pseudo: formData.pseudo,
          email: formData.email,
          password: formData.password,
        },
      });
      // Rafraîchir les données de l'utilisateur après la mise à jour
      refetch();
      // Sortir du mode d'édition
      setEditMode(false);
    } catch (error) {
      console.error("Update user error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser({ variables: { id: data.getme.id } });
      localStorage.clear();
      refetch();
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };
  const history = useNavigate();
  if (!isAuthenticated()) {
    history("/");
    return null;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { getme } = data;

  return (
    <Container>
      <Header as="h1">Votre profil</Header>
      {editMode ? (
        <div>
          <Input
            label="Pseudo"
            type="text"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
          />
          <br />
          <Input
            label="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <Button primary onClick={handleUpdate}>Enregistrer</Button>
          <Button onClick={() => setEditMode(false)}>Annuler</Button>
        </div>
      ) : (
        <div>
          <p>
            <strong>ID:</strong> {getme.id}
            <br />
            <strong>Pseudo:</strong> {getme.pseudo}
            <br />
            <strong>Email:</strong> {getme.email}
            <br />
            <strong>Role:</strong> {getme.role}
            <br />
          </p>
          <Button primary onClick={() => setEditMode(true)}>Modifier</Button>
          <Button negative onClick={handleDelete}>Supprimer</Button>
        </div>
      )}
    </Container>
  );
}

export default UserDetails;
