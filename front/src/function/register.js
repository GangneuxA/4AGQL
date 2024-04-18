import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated";
import { Form, Input, Button, Message } from "fomantic-ui-react";

const CREATE_USER = gql`
  mutation Createuser($email: String, $pseudo: String, $password: String) {
    createuser(email: $email, pseudo: $pseudo, password: $password) {
      email
      id
      password
      pseudo
      role
    }
  }
`;
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    pseudo: "",
    password: "",
  });

  const [createUser, { loading, error, data }] = useMutation(CREATE_USER, {
    context: {
      clientName: "user",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ variables: formData });
  };

  const history = useNavigate();
  const routeChange = (param) => {
    let path = `/${param}`;
    history(path);
  };

  const handleBackToHome = () => {
    history("/");
  };

  if (isAuthenticated()) {
    return (
      <div>
        <p>Vous êtes déjà connecté.</p>
        <button onClick={handleBackToHome}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="ui container">
      <h2 className="ui header">Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email:</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Pseudo:</label>
          <Input
            type="text"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password:</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Button type="submit" primary disabled={loading}>
          Register
        </Button>
        <Button
          color="primary"
          className="px-4"
          onClick={() => routeChange("login")}
        >
          Login
        </Button>
      </Form>
      {loading && <p>Loading...</p>}
      {error && <Message negative>Error: {error.message}</Message>}
      {data && <Message positive>User created successfully!</Message>}
    </div>
  );
};

export default RegisterPage;
