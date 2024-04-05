import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

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
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {context: {
    clientName: 'user'
    }});
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: { email: formData.email , password: formData.password }
      });
      const accessToken = data.login.accessToken;
      localStorage.setItem('accessToken', accessToken);
      const refreshToken = data.login.refreshToken;
      localStorage.setItem('refreshToken', refreshToken);
      const id = data.login.id;
      localStorage.setItem('id', id);
      const role = data.login.role;
      localStorage.setItem('role', role);
      // Effacez toute erreur de connexion précédente
      setLoginError('');
    } catch (error) {
      console.error('Login error:', error);
      // Définissez un message d'erreur approprié pour l'afficher à l'utilisateur
      setLoginError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>
  );
}

export default LoginForm;
