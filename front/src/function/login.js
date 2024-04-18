import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import isAuthenticated from "../utils/isAuthenticated";
import { Form, Input, Button, Message } from "fomantic-ui-react";

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      id
      refreshToken
      role
    }
  }
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER, {
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

  const handleLogin = async () => {
    const { data } = await loginUser({
      variables: { email: formData.email, password: formData.password },
    });
    if (data) {
      const accessToken = data.login.accessToken;
      localStorage.setItem("accessToken", accessToken);
      const refreshToken = data.login.refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
      const id = data.login.id;
      localStorage.setItem("id", id);
      const role = data.login.role;
      localStorage.setItem("role", role);
      history("/");
      window.location.reload();
    } else {
      console.log("erreur");
    }
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
      <h2 className="ui header">Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Button type="submit" disabled={loading}>
          Login
        </Button>
        <Button
          color="primary"
          className="px-4"
          onClick={() => routeChange("register")}
        >
          register
        </Button>
      </Form>
      {loading && <p>Loading...</p>}
      {error && <Message negative>Error: {error.message}</Message>}
      {data && <Message positive>User login</Message>}
    </div>
  );
};

export default LoginForm;
