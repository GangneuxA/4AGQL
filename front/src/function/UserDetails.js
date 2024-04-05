import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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

function UserDetails() {
  const { data, loading, error } = useQuery(GET_USER_BY_CRITERIA,{context: {
      clientName: 'user'
    }});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  const { getme } = data;

  return (
    <div>
      <h1>Votre profile</h1>
      <p>
        <strong>ID:</strong> {getme.id}<br />
        <strong>Pseudo:</strong> {getme.pseudo}<br />
        <strong>Email:</strong> {getme.email}<br />
        <strong>role:</strong> {getme.role}<br />
      </p>
    </div>
  );
}

export default UserDetails;
