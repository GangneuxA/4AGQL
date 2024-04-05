import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated";

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pseudo:</label>
          <input
            type="text"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Register
        </button>
        <button
          color="primary"
          className="px-4"
          onClick={() => routeChange("login")}
        >
          login
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>User created successfully!</p>}
    </div>
  );
};

export default RegisterPage;
