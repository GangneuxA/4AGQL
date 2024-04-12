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

function LoginForm() {
  const history = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER, {
    context: {
      clientName: "user",
    },
  });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: { email: formData.email, password: formData.password },
      });
      const accessToken = data.login.accessToken;
      localStorage.setItem("accessToken", accessToken);
      const refreshToken = data.login.refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
      const id = data.login.id;
      localStorage.setItem("id", id);
      const role = data.login.role;
      localStorage.setItem("role", role);
      setLoginError("");
      history("/");
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.message);
    }
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
      <Form>
        <Form.Field>
          <label>Email</label>
          <Input
            type="text"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Form.Field>
        <Button primary onClick={handleLogin}>
          Login
        </Button>
        {loginError && <Message negative>{loginError}</Message>}
      </Form>
    </div>
  );
}

export default LoginForm;
