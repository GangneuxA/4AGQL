import React from 'react';
import { gql, useQuery,  } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_ALL_CLASSROOM = gql`
query Query {
  getAllClassroom {
    name
    id
    numberMax
    member
  }
}
`;

function Home() {
  const { data, loading, error } = useQuery(GET_ALL_CLASSROOM, {context: {clientName: 'classroom'}});

  const history = useNavigate();
  
  const routeChange = (name) =>{ 
    let path = `/detailclassroom/${name}`; 
    history(path);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="ui container">
      <h1 className="ui header">Classroom Search</h1>
      <div className="ui relaxed divided list">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data &&
          data.getAllClassroom.map((classroom) => (
            <div key={classroom.id} className="item">
              <div className="content">
                <span className="header">Name: {classroom.name}</span>
                <div className="description">
                  <p>ID: {classroom.id}</p>
                  <p>NumberMax: {classroom.numberMax}</p>
                </div>
                <button
                  className="ui primary button"
                  onClick={() => routeChange(classroom.name)}
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;