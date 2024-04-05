import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_USER_BY_CRITERIA = gql`
  query Users($id: ID!) {
    getuser(id: $id) {
      id
      name
      email
    }
  }
`;

function UserDetails() {
  const { id } = useParams(); // Récupérer le critère et la valeur de l'URL
  console.log(id)
  const { data, loading, error } = useQuery(GET_USER_BY_CRITERIA, {
    variables: { id: id }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  const { user } = data;

  return (
    <div>
      <h1>Details de l'utilisateur</h1>
      <p>
        <strong>ID:</strong> {user.id}<br />
        <strong>Nom:</strong> {user.name}<br />
        <strong>Email:</strong> {user.email}<br />
      </p>
    </div>
  );
}

export default UserDetails;
